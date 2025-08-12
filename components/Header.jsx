import chefClaudeLogo from "/images/chef-icon.png"
export default function Header(){
    return(
        <header>
            <img src={chefClaudeLogo}/>
            <h1>Flavorly.AI</h1>
        </header>
    )
}