import React from "react";
// Component
import CommentCard from "../home_module/CommentCard";
// fetch data
import { yourComments } from "@/components/data/homeData";

function CommentsComponent() {
  return (
    <>
      <div className="test">
        <div className="comment_card_container">
          {yourComments?.slice(0, 3).map((item) => (
            <CommentCard key={item.id} {...item} />
          ))}
          <div className="comment_card_container2">
            {yourComments?.slice(0, 3).map((item) => (
              <CommentCard key={item.id} {...item} />
            ))}
          </div>
        </div>

        <hr />

        <div className="comment_card_container3">
          {yourComments?.slice(4, 7).map((item) => (
            <CommentCard key={item.id} {...item} />
          ))}
          <div className="comment_card_container4">
            {yourComments?.slice(4, 7).map((item) => (
              <CommentCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentsComponent;
