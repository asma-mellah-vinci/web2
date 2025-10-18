interface UserCardProps{
    name : string;
    age  : number;
}

const UserCard = (props : UserCardProps) => {
    return ( 
    <div>
        <h2>{props.name}</h2>
        <p>Age: {props.age}</p>
    </div>
    );
};

export default UserCard;