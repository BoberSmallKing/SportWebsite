function RatingDiff({ diff }) {
    if (diff === 0) return null;
    
    const isPositive = diff > 0;
    return (
      <div className={`rating-diff ${isPositive ? 'plus' : 'minus'}`}>
        {isPositive ? `+${diff}` : diff}
      </div>
    );
  }

export default RatingDiff