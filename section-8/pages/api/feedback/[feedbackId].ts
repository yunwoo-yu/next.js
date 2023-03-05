import { NextApiRequest, NextApiResponse } from 'next';
import { FeedbackItemsTypes } from '../..';
import { buildFeedbackPath, extractFeedbak } from './index';

function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ feedback: FeedbackItemsTypes }>
) {
  const feedbackId = req.query.feedbackId;
  const filePath = buildFeedbackPath();
  const feedbackData = extractFeedbak(filePath);

  const selectedFeedback: FeedbackItemsTypes = feedbackData.find(
    (feedback: FeedbackItemsTypes) => feedback.id === feedbackId
  );
  res.status(200).json({ feedback: selectedFeedback });
}

export default handler;
