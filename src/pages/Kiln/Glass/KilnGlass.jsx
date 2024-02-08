import PropTypes from 'prop-types';

// import {
//   useFetchAllProTableRecords,
//   useFetchProTableRecordById,
//   usePostProTableRecord,
//   usePutProTableRecord,
//   useDeleteProTableRecord,
//   useFetchAllKilnGlassRecords,
//   useFetchKilnGlassRecordById,
//   usePostKilnGlassRecord,
//   usePutKilnGlassRecord,
//   useDeleteKilnGlassRecord,
// } from '../Ceramic/useKilnCeramic.jsx';

const KilnGlass = ({setKilnGlassRecords}) => {
console.log(setKilnGlassRecords)

  return (
    <>
      <h1>Kiln Glass</h1>
    </>
  );
};

KilnGlass.propTypes = {
  setKilnGlassRecords: PropTypes.func,
};

export default KilnGlass;
