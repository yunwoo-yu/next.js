import React, { useState } from 'react';
import { FeedbackItemsTypes } from '..';
import { buildFeedbackPath, extractFeedbak } from '../api/feedback/index';

const Feedback = ({
  feedbackItems,
}: {
  feedbackItems: FeedbackItemsTypes[];
}) => {
  const [feedbackData, setFeedbackData] = useState<FeedbackItemsTypes | null>(
    null
  );

  const loadFeedbackHandler = (id: string) => {
    fetch(`/api/feedback/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      });
  };

  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {feedbackItems.map((item: FeedbackItemsTypes) => (
          <li key={item.id}>
            {item.text}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show Detail
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedbak(filePath);

  return { props: { feedbackItems: data } };
}

export default Feedback;
