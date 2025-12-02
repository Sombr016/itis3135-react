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
    const [displayPersonalStatement, setDisplayPersonalStatement] = useState(true);
    const [displayBackgrounds, setDisplayBackgrounds] = useState(true);
    const [displayClasses, setDisplayClasses] = useState(true);
    const [displayExtraInformation, setDisplayExtraInformation] = useState(true);
    const [displayQuote, setDisplayQuote] = useState(true);
    const [displayLinks, setDisplayLinks] = useState(true);
    const [showSlideShow, setShowSlideShow] = useState(false);
    const [indexOfSlideShow, setIndexOfSlideShow] = useState(0);

    {/* Getting information from API*/ }
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

    {/* Search filtering*/ }
    const filteredIntroductionData = introductionData.filter((data) => {
        if (nameSearch === "") return true;
        const fullStudentName = `${data.name.first} ${data.name.middleInitial}. "${data.name.preferred}" ${data.name.last}`;
        return fullStudentName.toLowerCase().includes(nameSearch.toLowerCase());
    })
    return (
        <>
            <h2>Everyone's Introductions</h2>

            {/*Search */}
            <label>
                Search for Student:
                <input type="text" onChange={(event) => setNameSearch(event.target.value)} />
            </label>

            {/*Check Box Filters */}
            <section>
                <h3>Show Items: </h3>

                <label>
                    Name:
                    <input type="checkbox" checked={displayName} onClick={() => setDisplayName(!displayName)} />
                </label>



                <label>
                    Mascot:
                    <input type="checkbox" checked={displayMascot} onClick={() => setDisplayMascot(!displayMascot)} />
                </label>



                <label>
                    Image:
                    <input type="checkbox" checked={displayImage} onClick={() => setDisplayImage(!displayImage)} />
                </label>


                <label>
                    Personal Statement:
                    <input type="checkbox" checked={displayPersonalStatement} onClick={() => setDisplayPersonalStatement(!displayPersonalStatement)} />
                </label>


                <label>
                    Backgrounds:
                    <input type="checkbox" checked={displayBackgrounds} onClick={() => setDisplayBackgrounds(!displayBackgrounds)} />
                </label>


                <label>
                    Classes:
                    <input type="checkbox" checked={displayClasses} onClick={() => setDisplayClasses(!displayClasses)} />
                </label>


                <label>
                    Extra Information:
                    <input type="checkbox" checked={displayExtraInformation} onClick={() => setDisplayExtraInformation(!displayExtraInformation)} />
                </label>


                <label>
                    Quote:
                    <input type="checkbox" checked={displayQuote} onClick={() => setDisplayQuote(!displayQuote)} />
                </label>


                <label>
                    Links:
                    <input type="checkbox" checked={displayLinks} onClick={() => setDisplayLinks(!displayLinks)} />
                </label>
            </section>

            {/*Slide Show button*/}
            <section>
                <button onClick={() => setShowSlideShow(!showSlideShow)}>
                    {showSlideShow ? "View All" : "View Slideshow"}
                </button>
            </section>




            {/* Error Message*/}
            {error == null ? "" : <p>Error Code: {error}</p>}
            {

                showSlideShow
                    ? //if true display in a slide show
                    <>
                        {/* Slide Show buttons*/}
                        <button onClick={() => indexOfSlideShow - 1 < 0 ? setIndexOfSlideShow(filteredIntroductionData.length - 1) : setIndexOfSlideShow(indexOfSlideShow - 1)}>Previous</button>
                        <button onClick={() => indexOfSlideShow + 1 >= filteredIntroductionData.length ? setIndexOfSlideShow(0) : setIndexOfSlideShow(indexOfSlideShow + 1)}>Next</button>

                        {/* Slider */}
                        <input
                            id={"slider"}
                            type="range"
                            max={filteredIntroductionData.length - 1}
                            min={0}
                            step={1}
                            onChange={(event) =>
                                setIndexOfSlideShow(event.target.value)
                            }
                            value={indexOfSlideShow}
                        />

                      
                            <StudentIntroduction studentData={filteredIntroductionData[indexOfSlideShow]} displayMascot={displayMascot} displayName={displayName} displayImage={displayImage} displayPersonalStatement={displayPersonalStatement} displayBackgrounds={displayBackgrounds} displayClasses={displayClasses} displayExtraInformation={displayExtraInformation} displayQuote={displayQuote} displayLinks={displayLinks}></StudentIntroduction>
                      

                    </>

                    : // if false display information normally
                    filteredIntroductionData.map((studentData, index) =>
                        <StudentIntroduction key={index} studentData={studentData} displayMascot={displayMascot} displayName={displayName} displayImage={displayImage} displayPersonalStatement={displayPersonalStatement} displayBackgrounds={displayBackgrounds} displayClasses={displayClasses} displayExtraInformation={displayExtraInformation} displayQuote={displayQuote} displayLinks={displayLinks}></StudentIntroduction>
                    )
            }
            {/*<p> {JSON.stringify(introductionData)}</p>*/} {/* Display JSON studentData*/}
        </>
    );
}