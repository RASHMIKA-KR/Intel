import  { useEffect, useState } from 'react';
import axios from 'axios';

function MaterialList() {
  const [allPdfs, setAllPdfs] = useState(null);

  useEffect(() => {
    getPdfs();
  }, []);

  const getPdfs = async () => {
    try {
      const result = await axios.get('http://localhost:4000/api/file/get-files');
      setAllPdfs(result.data.data);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
    }
  };

  const downloadPdf = async (pdfId, pdfName) => {
    try {
      const response = await axios({
        url: `http://localhost:4000/api/file//download/${pdfId}`,
        method: 'GET',
        responseType: 'blob', // important
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', pdfName); // or any other filename you want
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return (
    <div className="uploaded">
      <h4>All Available Materials:</h4>
      <div className="output-div">
        {allPdfs == null
          ? ''
          : allPdfs.map((data) => (
              <div className="inner-div" key={data._id}>
                <h5>Title: {data.title}</h5>
                <button
                  className="btn btn-primary"
                  onClick={() => downloadPdf(data._id, data.pdf)}
                >
                  Download
                </button>
              </div>
            ))}
      </div>
    </div>
  );
}

export default MaterialList;
