import { readFileSync, writeFileSync } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { FeedbackItemsTypes } from '../../index';

export function buildFeedbackPath() {
  return path.join(process.cwd(), 'data', 'feedback.json');
}

export function extractFeedbak(filePath: string) {
  const fileData = readFileSync(filePath, 'utf-8');
  const data = JSON.parse(fileData);

  return data;
}

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const email: string = req.body.email;
    const feedbackText: string = req.body.text;

    const newFeedBack = {
      id: new Date().toISOString(),
      email,
      text: feedbackText,
    };

    // store that in a database or in a file
    const filePath = buildFeedbackPath();
    const data = extractFeedbak(filePath);
    data.push(newFeedBack);
    writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: 'Success!', feedback: newFeedBack });
  } else {
    const filePath = buildFeedbackPath();
    const data: FeedbackItemsTypes = extractFeedbak(filePath);

    res.status(200).json({ feedback: data });
  }
}

export default handler;
