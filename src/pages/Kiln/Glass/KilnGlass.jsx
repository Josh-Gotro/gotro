import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import ProTable from './ProTable.jsx';

// import {
// useFetchAllProTableRecords,
// useFetchProTableRecordById,
// usePostProTableRecord,
// usePutProTableRecord,
// useDeleteProTableRecord,
// useFetchAllKilnGlassRecords,
// useFetchKilnGlassRecordById,
// usePostKilnGlassRecord,
// usePutKilnGlassRecord,
// useDeleteKilnGlassRecord,
// } from '../Glass/useKilnGlass.jsx';

const KilnGlass = ({ setKilnGlassRecords, proTableRecords }) => {
  // const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [showFiringSchedule, setShowFiringSchedule] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (proTableRecords.length > 0) {
      setIsLoading(false);
    }
  }, [proTableRecords]);

  const handleViewFiringScheduleClick = () => {
    setShowFiringSchedule(!showFiringSchedule);
  };

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      mode: 'PRO',
      firingSchedule: proTableRecords[0]?.name,
    },
  });

  const onSubmit = (data) => {
    setKilnGlassRecords(data);
  };

  const watchMode = watch('mode');
  const watchGlassType = watch('glassType', '');
  const selectedFiringScheduleName = watch('firingSchedule');

  const selectedFiringSchedule = proTableRecords.find(
    (record) => record.name === selectedFiringScheduleName
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Mode:
          <select {...register('mode')}>
            <option value='PRO'>PRO</option>
            <option value='AUTO'>AUTO</option>
          </select>
        </label>
        {watchMode === 'PRO' && (
          <label>
            Firing Schedule:
            <select {...register('firingSchedule')}>
              {proTableRecords.map((record) => (
                <option key={record.id} value={record.name}>
                  {record.name}
                </option>
              ))}
            </select>
            <span onClick={handleViewFiringScheduleClick}>
              View Firing Schedule
            </span>
            {showFiringSchedule && selectedFiringSchedule.name && (
              <ProTable firingSchedule={selectedFiringSchedule} />
            )}
          </label>
        )}
        {watchMode === 'AUTO' && (
          <>
            <label>
              Speed:
              <select {...register('speed')}>
                <option value='SLo'>SLo</option>
                <option value='MEd'>MEd</option>
              </select>
            </label>
            <label>
              Process:
              <select {...register('process')}>
                <option value='SLP'>SLP</option>
                <option value='tAC'>tAC</option>
                <option value='FULL'>FULL</option>
              </select>
            </label>
            <label>
              Adjust Temp:
              <input type='text' {...register('adjustTemp')} />
            </label>
            <label>
              Adjust Time:
              <div>
                <input
                  type='number'
                  min='0'
                  max='23'
                  placeholder='HH'
                  {...register('adjustTimeHours')}
                />
                <input
                  type='number'
                  min='0'
                  max='59'
                  placeholder='MM'
                  {...register('adjustTimeMinutes')}
                />
              </div>
            </label>
          </>
        )}
        <label>
          Room Temp:
          <input type='number' {...register('roomTemp')} />
        </label>
        <label>
          Glass Type:
          <select {...register('glassType')}>
            <option value='WINE'>WINE</option>
            <option value='BEER'>BEER</option>
            <option value='STAINED'>STAINED</option>
            <option value='96COE'>96COE</option>
            <option value='90COE'>90COE</option>
            <option value='MIXED'>MIXED</option>
            <option value='OTHER'>OTHER</option>
          </select>
        </label>

        {watchGlassType === 'OTHER' ||
          (watchGlassType === 'MIXED' && (
            <label>
              Other:
              <input type='text' name='other' {...register('other')} />
            </label>
          ))}
        <label>
          Loading Notes:
          <textarea name='loadingNotes' {...register('loadingNotes')} />
        </label>
        <label>
          Unloading Notes:
          <textarea name='unloadingNotes' {...register('unloadingNotes')} />
        </label>
        <label>
          Total Fire Time:
          <div>
            <input
              type='number'
              min='0'
              max='23'
              placeholder='HH'
              {...register('totalFireTimeHours')}
            />
            <input
              type='number'
              min='0'
              max='59'
              placeholder='MM'
              {...register('totalFireTimeMinutes')}
            />
          </div>
        </label>
        <input type='submit' />
      </form>
    </div>
  );
};

KilnGlass.propTypes = {
  setKilnGlassRecords: PropTypes.func,
  proTableRecords: PropTypes.arrayOf(
    PropTypes.shape({
      add_time_hr: PropTypes.number,
      add_time_m: PropTypes.number,
      adjusted_temp: PropTypes.string,
      created_at: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      rate_temp_hr_m_1: PropTypes.arrayOf(PropTypes.number),
      rate_temp_hr_m_2: PropTypes.arrayOf(PropTypes.number),
      rate_temp_hr_m_3: PropTypes.arrayOf(PropTypes.number),
      rate_temp_hr_m_4: PropTypes.arrayOf(PropTypes.number),
      rate_temp_hr_m_5: PropTypes.arrayOf(PropTypes.number),
      rate_temp_hr_m_6: PropTypes.arrayOf(PropTypes.number),
      rate_temp_hr_m_7: PropTypes.arrayOf(PropTypes.number),
      rate_temp_hr_m_8: PropTypes.arrayOf(PropTypes.number),
      segs: PropTypes.oneOf(['1', '2', '3', '4', '5', '6', '7', '8']),
      skip: PropTypes.string,
      slot: PropTypes.oneOf(['1', '2', '3', '4', '5']),
    })
  ),
};

export default KilnGlass;
