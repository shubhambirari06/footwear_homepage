import './OfferSection.css';

const offers = [
  {
    id: 1,
    title: 'Flat 50% Off',
    category: 'On Sneakers',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 2,
    title: 'Upto 60% Off',
    category: 'On Boots',
    image: 'https://images.pexels.com/photos/1003829/pexels-photo-1003829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

const OfferSection = () => {
  return (
    <section className="offer-section">
      <h2>Deals of the Day</h2>
      <div className="offer-list">
        {offers.map((offer) => (
          <div key={offer.id} className="offer-card" style={{ backgroundImage: `url(${offer.image})` }}>
            <div className="offer-content">
              <h3>{offer.title}</h3>
              <p>{offer.category}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OfferSection;
