import React from 'react'

const AboutPage = () => {
    return (
        <div className="about">
            <div className="about_section">
                <div className="rules text others">
                    <h3>About The Game of Life</h3>
                    <p>The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input.</p>
                    <span><a href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life" target="_blank">Wikipedia</a></span>
                </div>
                <div className="rules others">
                    <h3>Instructions</h3>
                    <li>Click <button style={{color: "green", border: "green 1px solid"}}>Start</button> to begin simulating. This button only appears if simulation <strong>is not</strong> running.</li>
                    <li>Click <button style={{color: "red", border: "red 1px solid"}}>Stop</button> to stop simulating. This button only appears if the simulation <strong>is</strong> running.</li>
                    <li>Click <button>Next Generation</button> to go to the next life-cycle generation.</li>
                    <li>Click <button>Reset</button> to reset the grid and the generation.</li>
                    <li>The grid's size is based on your browser's current window size. If you click <button>Reset</button> with a new window size, the size of the grid will change.</li>
                    <li>Click on any box on the grid to toggle it's status.</li>
                </div>
                <div className="rules others">
                        <h3>Rules of the Game</h3>
                        <ol className="list">
                            <li>Any live cell with two or three live neighbours survives.</li>
                            <li>Any dead cell with three live neighbours becomes a live cell.</li>
                            <li>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>
                        </ol>
                </div>
                <div className="rules others">
                    <h3>About Me</h3>
                    <a href="https://github.com/PHONGdotTech">Phong's GitHub profile</a>
                    <a href="https://github.com/PHONGdotTech/gameoflife">This project's GitHub repo</a>
                    <p>Built using React, functional components, and doubly linked lists as the primary data structure.</p>
                </div>
            </div>
        </div>
    )
}

export default AboutPage