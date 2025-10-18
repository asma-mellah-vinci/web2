
interface PageTitleProps {
    title : string;
}

const PageTitle = (props : PageTitleProps) => {
    return <h1>{props.title}</h1>
}

// default car il y a qu'un truc a exporter ici et c'est le titre
export default PageTitle;