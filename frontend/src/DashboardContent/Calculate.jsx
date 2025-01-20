// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios
//       .get('/cหal/api/fertilizer.php?cropID=17&N=สูง&P=ต่ำ&K=ปานกลาง')
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((error) => {
//         setError(error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Data</h1>
//       {error && <p>Error: {error.message}</p>}
//       {data ? (
//         <pre>{JSON.stringify(data, null, 2)}</pre>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default App;
function Recommend() {
  return (
      <div>
          <h2>This is Calculate Page.</h2>
      </div>
  );
}

export default Recommend;
