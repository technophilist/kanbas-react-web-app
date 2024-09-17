import {useMemo} from "react";
import teslabotImage from "../../images/teslabot.jpeg"

const quizzes = [
    {
        title: "Q1",
        topic: "HTML",
        date: "2/3/21",
        grade: "85"
    },
    {
        title: "Q2",
        topic: "CSS",
        date: "2/10/21",
        grade: "90"
    },
    {
        title: "Q3",
        topic: "JavaScript",
        date: "2/17/21",
        grade: "95"
    },
    {
        title: "Q4",
        topic: "React",
        date: "2/24/21",
        grade: "88"
    },
    {
        title: "Q5",
        topic: "TypeScript",
        date: "3/3/21",
        grade: "92"
    },
    {
        title: "Q6",
        topic: "Node.js",
        date: "3/10/21",
        grade: "87"
    },
    {
        title: "Q7",
        topic: "Express",
        date: "3/17/21",
        grade: "91"
    },
    {
        title: "Q8",
        topic: "MongoDB",
        date: "3/24/21",
        grade: "89"
    },
    {
        title: "Q9",
        topic: "GraphQL",
        date: "3/31/21",
        grade: "93"
    },
    {
        title: "Q10",
        topic: "Docker",
        date: "4/7/21",
        grade: "90"
    },
]

function Lab1() {
    const quizRows = useMemo(() => {
        return quizzes.map((quiz) => {
            return <tr>
                <td>{quiz.title}</td>
                <td>{quiz.topic}</td>
                <td>{quiz.date}</td>
                <td>{quiz.grade}</td>
            </tr>
        })
    }, [])
    return (
        <div id="wd-lab1">
            <h2>Lab 1</h2>
            <h3>HTML Examples</h3>
            <div id="wd-h-tag">
                <h4>Heading Tags</h4>
                <p>
                    Text documents are often broken up into several sections and subsections. Each section is usually
                    prefaced with a short
                    title or heading that attempts to summarize the topic of the section it precedes. For instance, this
                    paragraph is preceded by the heading Heading Tags. The font of the section headings are usually
                    larger and bolder than their subsection headings. This document uses headings
                    to introduce topics such as HTML Documents, HTML Tags, Heading Tags, etc. HTML
                    heading tags can be used to format plain text so that it renders in a browser as large headings.
                    There are 6 heading tags
                    for different sizes: h1, h2, h3, h4, h5, and h6. Tag h1 is the largest heading, and h6 is the
                    smallest heading.
                </p>
            </div>
            <div id="wd-p-tag">
                <h4>Paragraph Tag</h4>
                <div id="wd-p-tag">
                    <p id="wd-p-2">
                        This is the first paragraph. The paragraph tag is used to format vertical gaps between long
                        pieces of text like this one.

                    </p>
                    <p id="wd-p-3">
                        This is the second paragraph. Even though there is a deliberate white gap between the paragraph
                        above and this paragraph, by default browsers render them as one contiguous piece of text as
                        shown here on the right.
                    </p>
                    <p
                        id="wd-p-4">
                        This is the third paragraph. Wrap each paragraph with the paragraph tag to tell browsers to
                        render the gaps.
                    </p>
                </div>
            </div>
            <div id="wd-lists">
                <h4>List Tags</h4>
                <h5>Ordered List Tag</h5>
                <p>How to make pancakes:</p>
                <ol id="wd-pancakes">
                    <li>Mix dry ingredients.</li>
                    <li>Add wet ingredients.</li>
                    <li>Stir to combine.</li>
                    <li>Heat a skillet or griddle.</li>
                    <li>Pour batter onto the skillet.</li>
                    <li>Cook until bubbly on top.</li>
                    <li>Flip and cook the other side.</li>
                    <li>Serve and enjoy!</li>
                </ol>
                <p>My favourite recipe</p>
                <ol id="wd-your-favorite-recipe">
                    <li>Choose your favorite fruit.</li>
                    <li>Peel and cut the fruit into small pieces.</li>
                    <li>Blend the fruit with some water or juice.</li>
                    <li>Pour into a glass and enjoy!</li>
                </ol>
                <h5>Unordered List Tag</h5>
                <p>My favorite books (in no particular order)</p>
                <ul id="wd-my-books">
                    <li>Dune</li>
                    <li>Lord of the Rings</li>
                    <li>Ender's Game</li>
                    <li>Red Mars</li>
                    <li>The Forever War</li>
                </ul>
                <p>Your favorite books (in no particular order)</p>
                <ul id="wd-your-books">
                    <li>The Catcher in the Rye</li>
                    <li>Pride and Prejudice</li>
                    <li>Brave New World</li>
                </ul>
            </div>
            <div id="wd-tables">
                <h4>Table Tag</h4>
                <table border={1} width="100%">
                    <thead>
                    <tr>
                        <th>Quiz</th>
                        <th>Topic</th>
                        <th>Date</th>
                        <th>Grade</th>
                    </tr>
                    </thead>
                    <tbody>
                    {quizRows}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colSpan={3}>Average</td>
                        <td>90</td>
                    </tr>
                    </tfoot>
                </table>
            </div>
            <div id="wd-images">
                <h4>Image tag</h4>
                Loading an image from the internet:
                <br/>
                <img id="wd-starship"
                     width="400px"
                     src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
                />
                <br/>
                Loading a local image:
                <br/>
                <img id="wd-teslabot" src={teslabotImage} height="200px"/>
            </div>
            <div id="wd-forms">
                <h4>Form Elements</h4>
                <form id=
                          "wd-text-fields">
                    <h5>Text Fields</h5>
                    <label htmlFor=
                               "wd-text-fields-username">Username:</label>
                    <input id=
                               "wd-text-fields-username" placeholder=
                               "jdoe"/> <br/>
                    <label htmlFor=
                               "wd-text-fields-password">Password:</label>
                    <input type=
                               "password" id=
                               "wd-text-fields-password" value=
                               "123@#$asd"/>
                    <br/>
                    <label htmlFor=
                               "wd-text-fields-first-name">First name:</label>
                    <input type="text" id="wd-text-fields-first-name" title="John"/> <br/>
                    <label htmlFor="wd-text-fields-last-name">Last name:</label>
                    <input type="text" id="wd-text-fields-last-name" placeholder="Doe"
                           value="Wonderland" title="The last name"/>
                    <h5>Text boxes</h5>
                    <label htmlFor="wd-textarea">Biography:</label><br/>
                    <textarea id="wd-textarea" cols={30} rows={10}>Lorem ipsum dolor sit
                        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.</textarea>
                </form>
            </div>
            {/*Buttons*/}
            <h5 id="wd-buttons">Buttons</h5>
            <button id="wd-all-good" onClick={() => alert("Life is Good!")} type="button">Hello World!</button>
            {/*File Upload*/}
            <h5>File upload</h5>
            <input id="wd-upload" type="file"/>
            {/*Radio Buttons*/}
            <h5 id="wd-radio-buttons">Radio buttons</h5>
            <label>Favorite movie genre:</label><br/>
            <input type="radio" name="radio-genre" id="wd-radio-comedy"/>
            <label htmlFor="wd-radio-comedy">Comedy</label><br/>
            <input type="radio" name="radio-genre" id="wd-radio-drama"/>
            <label htmlFor="wd-radio-drama">Drama</label><br/>
            <input type="radio" name="radio-genre" id="wd-radio-scifi"/>
            <label htmlFor="wd-radio-scifi">Science Fiction</label><br/>
            <input type="radio" name="radio-genre" id="wd-radio-fantasy"/>
            <label htmlFor="wd-radio-fantasy">Fantasy</label>
            {/*Checkboxes*/}
            <h5 id="wd-checkboxes">Checkboxes</h5>

            <label>Favorite movie genre:</label><br/>

            <input type="checkbox" name="check-genre" id="wd-chkbox-comedy"/>
            <label htmlFor="wd-chkbox-comedy">Comedy</label><br/>

            <input type="checkbox" name="check-genre" id="wd-chkbox-drama"/>
            <label htmlFor="wd-chkbox-drama">Drama</label><br/>

            <input type="checkbox" name="check-genre" id="wd-chkbox-scifi"/>
            <label htmlFor="wd-chkbox-scifi">Science Fiction</label><br/>

            <input type="checkbox" name="check-genre" id="wd-chkbox-fantasy"/>
            <label htmlFor="wd-chkbox-fantasy">Fantasy</label>
            {/*Dropdowns*/}
            <h4 id="wd-dropdowns">Dropdowns</h4>

            <h5>Select one</h5>
            <label htmlFor="wd-select-one-genre">Favorite movie genre:</label><br/>

            <select id="wd-select-one-genre">
                <option value="COMEDY">Comedy</option>
                <option value="DRAMA">Drama</option>
                <option selected value="SCIFI">Science Fiction</option>
                <option value="FANTASY">Fantasy</option>
            </select>

            <h5>Select many</h5>
            <label htmlFor="wd-select-many-genre">Favorite movie genres:</label><br/>

            <select id="wd-select-many-genre" multiple>
                <option selected value="COMEDY">Comedy</option>
                <option value="DRAMA">Drama</option>
                <option selected value="SCIFI">Science Fiction</option>
                <option value="FANTASY">Fantasy</option>
            </select>
            {/*Other HTML field types*/}
            <h4>Other HTML field types</h4>

            <label htmlFor="wd-text-fields-email">Email:</label>
            <input type="email" id="wd-text-fields-email" placeholder="jdoe@somewhere.com"/><br/>

            <label htmlFor="wd-text-fields-salary-start">Starting salary:</label>
            <input type="number" id="wd-text-fields-salary-start" placeholder="1000" value="100000"/><br/>

            <label htmlFor="wd-text-fields-rating">Rating:</label>
            <input type="range" id="wd-text-fields-rating" placeholder="Doe" max="5" value="4"/><br/>

            <label htmlFor="wd-text-fields-dob">Date of birth:</label>
            <input type="date" id="wd-text-fields-dob" value="2000-01-21"/><br/>
            {/*Anchor Tag*/}
            <span>Please <a id="wd-lipsum" href="https://www.lipsum.com">click here</a> to get dummy text</span> <br/>
        </div>
    )
}

export default Lab1