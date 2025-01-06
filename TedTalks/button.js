const menuBtn = document.getElementById('menu-icon');
const menuPlaceholder = document.getElementById('menu-placeholder');

const menuItems = `
    <div class="menu-items">
                    <div class="form">
                        <form class="form-bar">
                            <div class="form-icon">
                                <img src="assets/svg/svgexport-12.svg" alt="icon">
                            </div>
                            <div class="form-text">
                                <input type="text" class="form-input" placeholder="Search talks, events, authors...">
                            </div>
                        </form>
                    </div>
                    <nav>
                        <ul>
                            <li class="watch-list">
                                <div class="nav-list">
                                    <div class="list-header">
                                        WATCH
                                    </div>
                                    <ul class="nav-list-items">
                                        <li class="nav-item"><a href="#">
                                            <div>TED Talks</div>
                                        </a></li>
                                        <li class="nav-item"><a href="#">
                                            <div>Playlists</div>
                                        </a></li>
                                        <li class="nav-item"><a href="#">
                                            <div>TED Series</div>
                                        </a></li>
                                        <li class="nav-item"><a href="#">
                                            <div>TED-Ed videos</div>
                                        </a></li>
                                        <li class="nav-item"><a href="#">
                                            <div>TEDx Talks</div>
                                        </a></li>
                                    </ul>
                                </div>
                                <div class="bottom-line"></div>
                            </li>
                            <li class="discover-list">
                                <div class="nav-list">
                                    <div class="list-header">
                                        DISCOVER
                                    </div>
                                    <ul class="nav-list-items">
                                        <li class="nav-item"><a href="#">
                                            <div>Topics</div>
                                        </a></li>
                                        <li class="nav-item"><a href="#">
                                            <div>Podcasts</div>
                                        </a></li>
                                        <li class="nav-item"><a href="#">
                                            <div>Ideas Blog</div>
                                        </a></li>
                                        <li class="nav-item"><a href="#">
                                            <div>Newsletters</div>
                                        </a></li>
                                        <li class="nav-item"><a href="#">
                                            <div>TED Games</div>
                                        </a></li>
                                    </ul>
                                </div>
                                <div class="bottom-line"></div>
                            </li>
                            <li class="attend-list">
                                <div class="nav-list">
                                    <div class="list-header">
                                        ATTEND
                                    </div>
                                    <ul class="nav-list-items">
                                        <li class="nav-item"><a href="#">
                                            <div>Conferences</div>
                                        </a></li>
                                        <li class="nav-item"><a href="#">
                                            <div>TEDx Events</div>
                                        </a></li>
                                        <li class="nav-item"><a href="#">
                                            <div>TED on Screen</div>
                                        </a></li>
                                        <li class="nav-item"><a href="#">
                                            <div>TED Courses</div>
                                        </a></li>
                                    </ul>
                                </div>
                                <div class="bottom-line"></div>
                            </li>
                            <li class="participate-list">
                                <div class="nav-list">
                                    <div class="list-header">
                                        PARTICIPATE
                                    </div>
                                    <ul class="nav-list-items">
                                        <li class="nav-item"><a href="#">
                                            <div>Nominate</div>
                                        </a></li>
                                        <li class="nav-item"><a href="#">
                                            <div>Organize a local TEDx Event</div>
                                        </a></li>
                                        <li class="nav-item"><a href="#">
                                            <div>TED-Ed</div>
                                        </a></li>
                                        <li class="nav-item"><a href="#">
                                            <div>Translate</div>
                                        </a></li>
                                        <li class="nav-item"><a href="#">
                                            <div>TED Fellows</div>
                                        </a></li>
                                    </ul>
                                </div>
                                <div class="bottom-line"></div>
                            </li>
                            <li class="about-list">
                                <div class="nav-list">
                                    <div class="list-header">
                                        ABOUT
                                    </div>
                                    <ul class="nav-list-items">
                                        <li class="nav-item"><a href="#">
                                            <div>Our Organization</div>
                                        </a></li>
                                        <li class="nav-item"><a href="#">
                                            <div>Conferences</div>
                                        </a></li>
                                        <li class="nav-item"><a href="#">
                                            <div>Programs & Initiatives</div>
                                        </a></li>
                                        <li class="nav-item"><a href="#">
                                            <div>Partner with TED</div>
                                        </a></li>
                                        <li class="nav-item"><a href="#">
                                            <div>TED Blog</div>
                                        </a></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </nav>
                    <a href="" class="nav-end-btn">
                        <div class="btn-text">Membership</div>
                    </a>
                </div>
`;


menuBtn.addEventListener("click", ()=>{
    if(menuPlaceholder.innerHTML.trim() === ""){
        menuPlaceholder.innerHTML = menuItems;
        const style = document.createElement('style');
        style.textContent = `
            header{
                background-color: rgba(18, 18, 18, 0.2);
                position: fixed;
                width:100%;
                top:0;
                left:0;
                z-index:1000;
            }

            main{
                background-color: rgb(229,231,235);
                position: fixed;
                width:100%;
                height:100vh;
                top:56px;
                z-index:999;
            }
            body{
                overflow:hidden;
            }
        `;

        document.head.appendChild(style);
    }else{
        menuPlaceholder.innerHTML = "";

    }
});

