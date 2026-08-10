import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchCeramicFirings,
  fetchCurrentCeramicFiring,
  upsertCeramicFiring,
} from './kilnApi';
import type { CeramicDraft, CeramicFiring } from './kilnApi';
import {
  ceramicQuestions,
  currentTimeHHMM,
  formatTime12h,
} from './ceramicQuestions';

/**
 * Ceramic firing log — v1's question-at-a-time wizard, kept (it matches how
 * a firing actually unfolds over a day) with two upgrades:
 * - completed answers are editable: click one to jump back to it
 * - the pyrometric cone bends as the firing progresses
 *
 * Persistence model is v1's: every answer upserts the record, so an
 * in-progress firing survives reloads and is resumed via
 * GET /current-ceramic-firing.
 */

export default function CeramicLog() {
  const queryClient = useQueryClient();
  const current = useQuery({
    queryKey: ['ceramic-current'],
    queryFn: fetchCurrentCeramicFiring,
  });
  const history = useQuery({
    queryKey: ['ceramic-history'],
    queryFn: fetchCeramicFirings,
  });

  return (
    <div className="ceramic-log">
      {current.isPending ? (
        <p className="kiln-note">checking for a firing in progress…</p>
      ) : current.isError ? (
        <p className="kiln-note">backend offline, recording unavailable</p>
      ) : (
        <CeramicWizard
          key={current.data?.id ?? 'new'}
          resumed={current.data ?? null}
          onFinished={() => {
            queryClient.invalidateQueries({ queryKey: ['ceramic-current'] });
            queryClient.invalidateQueries({ queryKey: ['ceramic-history'] });
          }}
        />
      )}

      <section className="kiln-history" aria-label="Completed firings">
        <h3>past firings</h3>
        {history.isPending && <p className="kiln-note">loading…</p>}
        {history.isError && <p className="kiln-note">history unavailable</p>}
        {history.data?.length === 0 && (
          <p className="kiln-note">no completed firings yet</p>
        )}
        {history.data?.map((firing) => (
          <details
            key={firing.id}
            className={`firing-card rating-${firing.rating ?? 'neutral'}`}
            name="ceramic-history"
          >
            <summary>
              <span>
                {new Date(firing.created_at).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
              <span className="firing-cone">
                cone {firing.cone_type ?? '?'}
              </span>
            </summary>
            <dl>
              <div>
                <dt>room temp</dt>
                <dd>{firing.room_temp ?? '-'}</dd>
              </div>
              <div>
                <dt>low fire</dt>
                <dd>{formatTime12h(firing.low_fire_start_time)}</dd>
              </div>
              <div>
                <dt>medium fire</dt>
                <dd>{formatTime12h(firing.medium_fire_start_time)}</dd>
              </div>
              <div>
                <dt>high fire</dt>
                <dd>{formatTime12h(firing.high_fire_start_time)}</dd>
              </div>
              <div>
                <dt>turned off</dt>
                <dd>{firing.kiln_turn_off_time ?? '-'}</dd>
              </div>
              {firing.loading_notes && (
                <div>
                  <dt>loading</dt>
                  <dd>{firing.loading_notes}</dd>
                </div>
              )}
              {firing.unloading_notes && (
                <div>
                  <dt>unloading</dt>
                  <dd>{firing.unloading_notes}</dd>
                </div>
              )}
            </dl>
          </details>
        ))}
      </section>
    </div>
  );
}

function CeramicWizard({
  resumed,
  onFinished,
}: {
  resumed: CeramicFiring | null;
  onFinished: () => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    if (!resumed) return { cone_type: '6' };
    const seeded: Record<string, string> = {};
    for (const q of ceramicQuestions) {
      const value = resumed[q.key];
      if (value != null) seeded[q.key] = String(value);
    }
    return seeded;
  });
  const [recordId, setRecordId] = useState<number | null>(resumed?.id ?? null);
  const [index, setIndex] = useState(() => {
    if (!resumed) return 0;
    const first = ceramicQuestions.findIndex((q) => resumed[q.key] == null);
    return first === -1 ? ceramicQuestions.length : first;
  });

  const save = useMutation({
    mutationFn: upsertCeramicFiring,
    onSuccess: (response) => {
      if (response?.id) setRecordId((id) => id ?? response.id);
    },
  });

  const question = ceramicQuestions[index];

  // Arriving at an empty time question stamps it with "now" — the common
  // case is logging the moment you flip the kiln switch.
  useEffect(() => {
    if (question?.type === 'time' && !answers[question.key]) {
      setAnswers((a) => ({ ...a, [question.key]: currentTimeHHMM() }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const draft = (extra?: Partial<CeramicDraft>): CeramicDraft => ({
    ...answers,
    ...(recordId ? { id: recordId } : {}),
    ...extra,
  });

  // Forward only: leaving a question blank skips it (it stays reachable from
  // the answer list). Never loops back, so "complete" is always reachable.
  const nextUnanswered = () => {
    const next = ceramicQuestions.findIndex(
      (q, i) => i > index && !answers[q.key],
    );
    return next === -1 ? ceramicQuestions.length : next;
  };

  const handleNext = () => {
    save.mutate(draft());
    setIndex(nextUnanswered());
  };

  const handleComplete = () => {
    save.mutate(draft({ firing_complete: true }), { onSuccess: onFinished });
  };

  const answeredCount = ceramicQuestions.filter((q) => answers[q.key]).length;
  const progress = answeredCount / ceramicQuestions.length;

  return (
    <section className="wizard" aria-label="Record a firing">
      <div className="wizard-head">
        <h3>{resumed ? 'firing in progress' : 'new firing'}</h3>
        {/* The cone bends as the firing gets further along. */}
        <div
          className="cone"
          style={{ '--progress': progress } as CSSProperties}
          aria-hidden="true"
        >
          <div className="cone-shape" />
          <span className="cone-label">cone {answers.cone_type ?? '-'}</span>
        </div>
      </div>

      <ol className="wizard-done">
        {ceramicQuestions.map((q, i) =>
          i !== index && (answers[q.key] || i < index) ? (
            <li key={q.key}>
              <button
                type="button"
                className="done-row"
                onClick={() => setIndex(i)}
                title="Edit this answer"
              >
                <span className="done-question">{q.text}</span>
                <span className="done-answer">
                  {!answers[q.key]
                    ? '-'
                    : q.type === 'time'
                      ? formatTime12h(answers[q.key])
                      : answers[q.key]}
                </span>
              </button>
            </li>
          ) : null,
        )}
      </ol>

      {question ? (
        <form
          className="wizard-current"
          onSubmit={(e) => {
            e.preventDefault();
            handleNext();
          }}
        >
          <label htmlFor="wizard-input">{question.text}</label>
          {question.type === 'select' ? (
            <select
              id="wizard-input"
              value={answers[question.key] ?? ''}
              onChange={(e) =>
                setAnswers((a) => ({ ...a, [question.key]: e.target.value }))
              }
            >
              <option value="">choose…</option>
              {question.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : question.type === 'textarea' ? (
            <textarea
              id="wizard-input"
              rows={2}
              value={answers[question.key] ?? ''}
              onChange={(e) =>
                setAnswers((a) => ({ ...a, [question.key]: e.target.value }))
              }
            />
          ) : (
            <input
              id="wizard-input"
              type={question.type}
              value={answers[question.key] ?? ''}
              onChange={(e) =>
                setAnswers((a) => ({ ...a, [question.key]: e.target.value }))
              }
            />
          )}
          <button type="submit" className="kiln-button">
            next
          </button>
        </form>
      ) : (
        <div className="wizard-current wizard-finish">
          <p>all steps logged</p>
          <button
            type="button"
            className="kiln-button kiln-button-fill"
            onClick={handleComplete}
            disabled={save.isPending}
          >
            {save.isPending ? 'saving…' : 'complete firing'}
          </button>
        </div>
      )}

      {save.isError && (
        <p className="kiln-note" role="status">
          couldn&rsquo;t save that step, it will retry with your next answer
        </p>
      )}
    </section>
  );
}
