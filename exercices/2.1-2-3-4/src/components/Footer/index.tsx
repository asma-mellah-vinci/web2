interface FooterProps {
    logo : string;
    children : React.ReactNode;
}

const Footer = (props : FooterProps) => {
    return (
        <footer>
            <img src={props.logo} alt="Logo" width="100" />
            <div>{props.children}</div>
        </footer>
    );
};

export default Footer;