import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import loadingImage from '../../../assets/lion.webp';

import ProTable from './ProTable.jsx';

import './kiln-glass.css';

import { usePostKilnGlassRecord } from './useKilnGlass.jsx';

const KilnGlass = ({ setKilnGlassRecord, proTableRecords }) => {
  // const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [showFiringSchedule, setShowFiringSchedule] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { postKilnGlassRecord } = usePostKilnGlassRecord(setKilnGlassRecord);

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

  const onSubmit = async (data) => {
    console.log(data);
    await postKilnGlassRecord(data);
  };

  const watchMode = watch('mode');
  const watchGlassType = watch('glass_type', '');
  const selectedFiringScheduleName = watch('pro_table_id');

  const selectedFiringSchedule = proTableRecords.find(
    (record) => record.name === selectedFiringScheduleName
  );

  if (isLoading) {
    return (
      <div className='loader'>
        <img src={loadingImage} alt='Loading...' />
      </div>
    );
  }

  return (
    <div>
      <h3>Record Firing</h3>
      <form className='form-grid' onSubmit={handleSubmit(onSubmit)}>
        <label>
          Mode:
          <select {...register('mode')}>
            <option value='PRO'>Pro</option>
            <option value='AUTO'>Auto</option>
          </select>
        </label>
        {watchMode === 'PRO' && (
          <label>
            Firing Schedule:
            <select {...register('pro_table_id')}>
              <option value='0'>{' Choose'}</option>

              {proTableRecords.map((record) => (
                <option key={record.id} value={record.id}>
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
              <select {...register('auto_speed')}>
                <option value='none'>-</option>
                <option value='SLo'>SLo</option>
                <option value='MEd'>MEd</option>
              </select>
            </label>
            <label>
              Process:
              <select {...register('auto_process')}>
                <option value='none'>-</option>
                <option value='SLP'>SLP</option>
                <option value='tAC'>tAC</option>
                <option value='FULL'>FULL</option>
              </select>
            </label>
            <label>
              Adjust Temp:
              <input type='text' {...register('auto_mod_temp')} />
            </label>
            <label>
              Adjust Time:
              <div className='time-inputs'>
                <input
                  type='number'
                  min='0'
                  max='23'
                  placeholder='HH'
                  {...register('auto_mod_hr')}
                />
                <input
                  type='number'
                  min='0'
                  max='59'
                  placeholder='MM'
                  {...register('auto_mod_m')}
                />
              </div>
            </label>
          </>
        )}
        <label>
          Room Temp:
          <input type='number' {...register('room_temp')} />
        </label>
        <label>
          Glass Type:
          <select {...register('glass_type')}>
            <option value='WINE'>Wine Bottle</option>
            <option value='BEER'>Beer Bottle</option>
            <option value='STAINED'>Stained Glass</option>
            <option value='96COE'>96 COE</option>
            <option value='90COE'>90 COE</option>
            <option value='MIXED'>Mixed</option>
            <option value='OTHER'>Other</option>
          </select>
        </label>

        {watchGlassType === 'OTHER' ||
          (watchGlassType === 'MIXED' && (
            <label>
              Other:
              <input
                type='text'
                name='other'
                {...register('glass_type_other')}
              />
            </label>
          ))}
        <label>
          Loading Notes:
          <textarea name='loadingNotes' {...register('loading_notes')} />
        </label>
        <label>
          Unloading Notes:
          <textarea name='unloadingNotes' {...register('unloading_notes')} />
        </label>
        <label>
          Total Fire Time:
          <div className='time-inputs'>
            <input
              type='number'
              min='0'
              max='23'
              placeholder='HH'
              {...register('fire_time_hr')}
            />
            <input
              type='number'
              min='0'
              max='59'
              placeholder='MM'
              {...register('fire_time_m')}
            />
          </div>
        </label>
        <input type='submit' />
      </form>
    </div>
  );
};

KilnGlass.propTypes = {
  setKilnGlassRecord: PropTypes.func,
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
