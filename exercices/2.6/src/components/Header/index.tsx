interface HeaderProps {
    logo : string; // url de l'image
    children : React.ReactNode; // contenue a afficher
}

const Header = (props : HeaderProps) => {
    return (
        <header>
            <img src={props.logo} alt="Logo" width="120" />
            <div>{props.children}</div>
        </header>
    );
};

export default Header;