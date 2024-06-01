import React from 'react'

const Footer = () => {
    return (
        <footer class="flex flex-wrap justify-between items-center w-full px-10 py-5 bg-black text-white">
            <div id="Logo" class="flex flex-col w-16 h-16">
                <a href="/">
                    <img src="https://www.marseille.fr/sites/default/files/blason-ville-de-marseille_0.png" alt="logo"/>
                </a>
                <span>SilverMicro</span>
            </div>
            <div id="Liens">
                <ul className="flex flex-col">
                    <li><a href="/">Accueil</a></li>
                    <li><a href="/restaurants">Restaurants</a></li>
                    <li><a href="/reservations">Reservations</a></li>
                    <li><a href="/profile">Profil</a></li>
                </ul>
            </div>
            <div id="Info">
                <a href="https://github.com/jean-bernard-laguerre/silver-micro">
                    <img
                        className='w-18 h-12' 
                        src="https://www.sferalabs.cc/wp-content/uploads/github-logo-white-300x199.png"
                        alt="github"
                    />
                </a>
            </div>
        </footer>
    )
}

export default Footer