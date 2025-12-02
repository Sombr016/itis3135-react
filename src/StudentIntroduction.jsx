
export default function StudentIntroduction({studentData, displayName, displayMascot, displayImage }) {

    return (
        <article>
            <h3>

                {
                    displayName &&
                    `${studentData.name.first} ${" "}
                                ${studentData.name.middleInitial ? studentData.name.middleInitial + ". " : ""} ${" "}
                                ${studentData.name.preferred ? '"' + studentData.name.preferred + '"' : ""} ${" "}
                                ${studentData.name.last} ${" "}`
                }




                {displayName && displayMascot && studentData.divider} {" "}
                {displayMascot && studentData.mascot}
            </h3>

            {
                displayImage ? // if displayImage is true display the figure
                    (
                        <figure>
                            <img src={"http://dvonb.xyz" + studentData.media.src} width="300px" alt="" />
                            <figcaption>{studentData.media.caption}</figcaption>
                        </figure>
                    ) : "" //This makes it do nothing
            }


            <p>{studentData.personalStatement}</p>
            <ul>
                <li><strong>Personal Background</strong>: {studentData.backgrounds.personal}</li>
                <li><strong>Professional Background</strong>: {studentData.backgrounds.professional}</li>
                <li><strong>Academic Background</strong>: {studentData.backgrounds.academic}</li>
                <li><strong>Subject Background</strong>: {studentData.backgrounds.subject}</li>
                <li><strong>Primary Computer</strong>: {studentData.platform.device}, {studentData.platform.os}</li>
                <li><strong>Courses</strong>:
                    <ol>
                        {
                            studentData.courses.map((course, index) =>
                                <li key={index}>
                                    <strong>{course.dept} {course.num} - {course.name}</strong> :  {course.reason}
                                </li>
                            )
                        }
                    </ol>
                </li>
                <li>
                    <strong>Fun Fact: </strong> {studentData.funFact}
                </li>
                <li>
                    <strong>Additional Information: </strong> {studentData.additional}
                </li>
            </ul>
            <p>
                <p id="quote"><em > "{studentData.quote.text}" </em></p>
                <p id="quote-name">-{studentData.quote.author}</p>
            </p>
            <nav>
                <a href={studentData.links.charlotte}>CLT Web</a> {" " + studentData.divider + " "}
                <a href={studentData.links.github}>GitHub</a> {" " + studentData.divider + " "}
                <a href={studentData.links.githubio}>GitHub.io</a> {" " + studentData.divider + " "}
                <a href={studentData.links.itis3135}>ITIS 3135</a> {" " + studentData.divider + " "}
                <a href={studentData.links.freecodecamp}>freeCodeCamp</a> {" " + studentData.divider + " "}
                <a href={studentData.links.codecademy}>Code Academy</a> {" " + studentData.divider + " "}
                <a href={studentData.links.linkedin}>LinkedIn</a>
            </nav>

            <hr />
        </article>
    )
}
{/*<p> {JSON.stringify(introductionData)}</p>*/ } {/* Display JSON studentData*/ }