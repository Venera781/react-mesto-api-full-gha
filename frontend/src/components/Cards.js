import Card from "./Card";
import { useCards } from "../contexts/CardsContext";

const Cards = ({ onCardLike, onDeleteClick, onOpenCard }) => {
  const elements = useCards();
  return (
    <section className="elements">
      {elements.map((element) => (
        <Card
          key={element._id}
          data={element}
          onCardLike={onCardLike}
          onDeleteClick={onDeleteClick}
          onOpenCard={onOpenCard}
        />
      ))}
    </section>
  );
};
export default Cards;
