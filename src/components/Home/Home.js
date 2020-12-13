import React, { useState, useEffect } from 'react';
import './Home.css';
import data from '../DB/data';
import { FaFileCsv } from 'react-icons/fa';

const Home = () => {
    const [csvData, setCsvData] = useState([])
    useEffect(() => {
        setCsvData(data)
    }, [])

    const handleDownload = (title) => {
        fetch('http://localhost:5000/download/' + title, {
            method: 'POST',
        })
            .then(res => res.blob())
            .then(blob => {
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = `${title} [bdstockdata.com] .xlsx`; // Here I want to get rid of hardcoded value instead I want filename from server
                link.click();
                link.remove(); //  Probably needed to remove html element after downloading?
            });
    }

    return (
        <div className="container">
            <div className="row p-5">
                <div className="col-md-8">
                    {csvData.map(csv =>

                        <div className="csvData m-3 p-5" key={csv.id}>

                            <div className="d-flex justify-content-center">
                                <div>
                                    <FaFileCsv size="100" />
                                </div>
                                <div className="ml-2">
                                    <h3><b>{csv.title}</b></h3>
                                    <h6>{csv.description}</h6>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-primary align-self-end" onClick={() => handleDownload(csv.title)}>Download</button>
                            </div>
                        </div>)}

                </div>
                <div className="col-md-4">

                </div>
            </div>

        </div>
    );
};

export default Home;