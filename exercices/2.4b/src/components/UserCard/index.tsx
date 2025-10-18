import "./UserCard.css";


interface UserCardProps {
    name : string;
    age  : number;
    isOnline : boolean;
}

const UserCard = (props : UserCardProps) => {
    if(props.isOnline){
        return (
            <div className="user-card online">
                <h3>{props.name}</h3>
                <p>Age : {props.age}</p>
                <p>En ligne</p>
            </div>
        )
    }else {
        return (
            <div className="user-card offline">
                <h3>{props.name}</h3>
                <p>Age : {props.age}</p>
                <p>Hors ligne</p>
            </div>
        )
    }
}

export default UserCard;