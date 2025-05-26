import React from "react";
import ContentLoader from "react-content-loader";

// import AppContext from "../../context";

import styles from "./Card.module.scss";

type Props = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  onFavorite: () => void;
  onPlus: () => void;
  favorited: boolean;
  loading: boolean;
  isItemAdded: boolean;
};

function Card({
  id,
  title,
  imageUrl,
  price,
  onFavorite,
  onPlus,
  isItemAdded,
  favorited = false,
  loading = false,
}: Props) {
  // const { isItemAdded } = React.useContext(AppContext);
  // const isItemAdded = true;
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = { id, parentId: id, title, imageUrl, price };


  const onClickPlus = () => {
    onPlus();
  };

  const onClickFavorite = () => {
    onFavorite();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start", // центрування по горизонталі
              alignItems: "center", // вирівнювання по вертикалі
              gap: "10px", // відстань між іконками
              paddingBottom: "20px",
            }}
          >
            { 
              (<div className={styles.favorite} onClick={onClickFavorite}>
                <img
                  src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"}
                  alt="Unliked"
                />
              </div>)
            }
          </div>

          <img width="100%" height={135} src={imageUrl} alt="Sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Ціна:</span>
              <b>{price} грн.</b>
            </div>
            {
              <img
                className={styles.plus}
                onClick={onClickPlus}
                src={isItemAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
                alt="Plus"
              />
            }
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
