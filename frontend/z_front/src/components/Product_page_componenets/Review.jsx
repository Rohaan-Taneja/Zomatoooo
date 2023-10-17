import React from "react";

const Review = () => {

  // css of this review section completed on 8th september

  return (
    <div className="reviews_section_div">
      {/* review 1  */}
      <div className="reviewpage_outer">
        <div className="complete_review_template">
          <div className="review_photoname_stars_div">
            <div className="review_photo">
              <img className="user_image" src={"/images/user.jpg"} alt="" />
            </div>
            <div className="review_name">
              {" "}
              <b>Ramesh Chaurasia</b>{" "}
            </div>
            <div className="review_stars">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-regular fa-star"></i>
            </div>
          </div>
          <div className="actual_review">great portions ,worth the money</div>
        </div>
        <hr />
      </div>


      {/* review 2 */}

      <div className="reviewpage_outer">
        <div className="complete_review_template">
          <div className="review_photoname_stars_div">
            <div className="review_photo">
              <img className="user_image" src={"/images/user2.png"} alt="" />
            </div>
            <div className="review_name">
              {" "}
              <b>Bulbul Chadha</b>{" "}
            </div>
            <div className="review_stars">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
            </div>
          </div>
          <div className="actual_review">good food</div>
        </div>
        <hr />
      </div>



      {/* review 3 */}

      <div className="reviewpage_outer">
        <div className="complete_review_template">
          <div className="review_photoname_stars_div">
            <div className="review_photo">
              <img className="user_image" src={"/images/user2.png"} alt="" />
            </div>
            <div className="review_name">
              {" "}
              <b>bablu</b>{" "}
            </div>
            <div className="review_stars">
              <i class="fa-solid fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
            </div>
          </div>
          <div className="actual_review">waste of money</div>
        </div>
        <hr />
      </div>


      {/* review 4  */}

      <div className="reviewpage_outer">
        <div className="complete_review_template">
          <div className="review_photoname_stars_div">
            <div className="review_photo">
              <img className="user_image" src={"/images/user2.png"} alt="" />
            </div>
            <div className="review_name">
              {" "}
              <b>Sampuran kishore shrivastav</b>{" "}
            </div>
            <div className="review_stars">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
            </div>
          </div>
          <div className="actual_review">Very expensive food , out of my budget</div>
        </div>
        <hr />
      </div>

      {/* review 5 */}

      <div className="reviewpage_outer">
        <div className="complete_review_template">
          <div className="review_photoname_stars_div">
            <div className="review_photo">
              <img className="user_image" src={"/images/user2.png"} alt="" />
            </div>
            <div className="review_name">
              {" "}
              <b>Bableshvar</b>{" "}
            </div>
            <div className="review_stars">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </div>
          </div>
          <div className="actual_review">HMM , ACHA , THEEKH HAI</div>
        </div>
      </div>
    </div>
  );
};

export default Review;
