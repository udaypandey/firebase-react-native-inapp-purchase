/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as logger from "firebase-functions/logger";

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const webhookHandler = functions.https.onRequest(
  async (request, response) => {
    logger.info("Received webook request");

    try {
      const firestore = admin.firestore();
      const body = request.body;
      const events = firestore.collection("webhook-events");

      logger.info(body);
      await events.add(body);

      response.send({});
    } catch (err) {
      logger.info("Processing failed");
    }
  }
);

export const forwardHandler = functions.https.onRequest(
  async (request, response) => {
    logger.info("Received forward request");
    try {
      const firestore = admin.firestore();
      const body = request.body;
      const events = firestore.collection("apple-events");
      
      logger.info(body);
      await events.add(body);

      response.send({});
    } catch (err) {
      logger.info("Processing failed");
    }
  }
);
