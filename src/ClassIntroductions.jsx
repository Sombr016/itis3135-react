import { useState, useEffect } from 'react'
import StudentIntroduction from './StudentIntroduction'
export default function ClassIntroduction() {
    document.title += "| Class Introductions"
    const [introductionData, setIntroductionData] = useState([]);
    const [error, setError] = useState(null);
    const [nameSearch, setNameSearch] = useState("");
    const [displayName, setDisplayName] = useState(true);
    const [displayMascot, setDisplayMascot] = useState(true);
    const [displayImage, setDisplayImage] = useState(true);
    const [showSlideShow, setShowSlideShow] = useState(false);
    const [indexOfSlideShow, setIndexOfSlideShow]  = useState(0);

    useEffect(() => {
        fetch("https://dvonb.xyz/api/2025-fall/itis-3135/students?full=1")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.status);
                }
            })
            .then((studentData) => setIntroductionData(studentData))
            .catch((error) => setError(error.message));
    }, [])

    const filteredIntroductionData = introductionData.filter((data) => {
        {/* Search filtering*/ }
        if (nameSearch === "") return true;
        const fullStudentName = `${data.name.first} ${data.name.middleInitial}. "${data.name.preferred}" ${data.name.last}`;
        return fullStudentName.toLowerCase().includes(nameSearch.toLowerCase());
    })
    return (
        <>
            <h2>Everyone's Introductions</h2>

            {/*Search */}
            <label>
                Search for Student: &nbsp;&nbsp;
                <input type="text" onChange={(event) => setNameSearch(event.target.value)} />
                name search: {nameSearch}
            </label>

            {/*Check Box Filters */}
            <section>
                <h3>Show Items: </h3>

                <label>
                    Name:
                    <input type="checkbox" checked={displayName} onClick={() => setDisplayName(!displayName)} />
                    display name: {displayName.toString()}
                </label>

                <br />

                <label>
                    Mascot:
                    <input type="checkbox" checked={displayMascot} onClick={() => setDisplayMascot(!displayMascot)} />
                    display Mascot: {displayMascot.toString()}
                </label>

                <br />

                <label>
                    Image:
                    <input type="checkbox" checked={displayImage} onClick={() => setDisplayImage(!displayImage)} />
                    display Image: {displayImage.toString()}
                </label>
            </section>

            {/*Slide Show */}
            <button onClick={() => setShowSlideShow(!showSlideShow)}>
                {showSlideShow ? "View All" : "View Slideshow"}
            </button>
            <br />
            {error == null ? "" : <p>Error Code: {error}</p>} {/* Error Message*/}
            {

                showSlideShow
                    ? //if true
                    <>

                        <button onClick={() => indexOfSlideShow - 1 < 0 ? setIndexOfSlideShow(filteredIntroductionData.length -1) : setIndexOfSlideShow(indexOfSlideShow - 1)}>Previous</button>
                        <button onClick={() => indexOfSlideShow + 1 >= filteredIntroductionData.length ? setIndexOfSlideShow(0) : setIndexOfSlideShow(indexOfSlideShow + 1)}>Next</button>  
                        
                        {/* Slider */}
                        <input 
                        id= {"slider"} 
                        type="range" 
                        max = {filteredIntroductionData.length -1}
                        min ={0}
                        step= {1}
                        onChange={(event) =>
                            setIndexOfSlideShow(event.target.value)
                        }
                        value = {indexOfSlideShow}
                        />
                        
                        <StudentIntroduction studentData={filteredIntroductionData[indexOfSlideShow]} displayMascot={displayMascot} displayName={displayName} displayImage={displayImage}></StudentIntroduction>
                    </>

                    : // if false

                    filteredIntroductionData.map((studentData, index) =>
                        <StudentIntroduction key={index} studentData={studentData} displayMascot={displayMascot} displayName={displayName} displayImage={displayImage}></StudentIntroduction>
                    )
            }
            {/*<p> {JSON.stringify(introductionData)}</p>*/} {/* Display JSON studentData*/}
        </>
    );
}