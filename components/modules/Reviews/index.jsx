import pt from 'prop-types';
import Rating from 'react-rating';
import ReviewForm from '../ReviewForm';
import { StarFilledIcon, StarOutlineIcon } from '../../elements/Icons';
import '../../../styles/comments.scss';

function Reviews ({ data, itineraryId }) {

  return (
    <>
      <div className="shadow-sm p-4 bg-white mt-4">
        <div className="comment__ulasan">
          <h3>Ulasan</h3>
          <ReviewForm data={data} itineraryId={itineraryId} />
        </div>
        <div className="comment__comments">
          {data.map(({ name, is_edited, updated_at, rating, content }) => (
            <>
              <hr />
              <div className="d-flex align-items-start">
                <div className="ml-4">
                  <div className="d-flex align-text-center flex-wrap justify-content-between">
                    <h5>{name}</h5>
                    <span>&nbsp;{updated_at}</span>
                  </div>
                  <h6>
                    <Rating
                      emptySymbol={
                        <StarOutlineIcon
                          className="mr-1"
                          height="1em"
                          width="1em"
                        />
                      }
                      fullSymbol={
                        <StarFilledIcon
                          className="mr-1"
                          height="1em"
                          width="1em"
                        />
                      }
                      initialRating={rating}
                      readonly
                    />
                  </h6>
                  <p>
                    {content}
                    <small className="text-muted">
                      {is_edited ? ' Edited' : ''}
                    </small>
                  </p>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

Reviews.propTypes = {
  data: pt.instanceOf(Array).isRequired,
  itineraryId: pt.number.isRequired,
}

export default Reviews;
