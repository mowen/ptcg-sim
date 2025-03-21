function CardView({
  name,
  imageUrl,
  className,
}: {
  name: string;
  imageUrl: string;
  className?: string;
}) {
  return (
    <img src={imageUrl} alt={name} className={`${className ?? ''} card`} />
  );
}

export default CardView;
