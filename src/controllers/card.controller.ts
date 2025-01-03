import { NextFunction, Request, Response } from "express";
import { CardBody } from "../common/typings/custom.interface";
import responseHandler from "../handlers/response.handler";
import CardService from "../services/card.service";
import { CustomRequest } from '../common/typings/custom.interface.d';

class CardController {
    async getAllCards( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const result = await CardService.getAllCards();
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async getCardById( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const cardId = Number( req.params.cardId );
            const result = await CardService.getCardById( cardId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async addCard( req : CustomRequest, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const listId = Number( req.body.listId );
            const userId: string = typeof req.user === "string" ? req.user : req.user?.userId;  
            const cardBody : CardBody = req.body.cardName;
            const result = await CardService.addCard( listId, userId, cardBody );
            responseHandler.created( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async addMemberToCard( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const cardId = Number( req.body.cardId );
            const userId = Number( req.body.userId );
            const result = await CardService.addMemberToCard( cardId, userId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async removeMemberFromCard( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const cardId = Number( req.body.cardId );
            const userId = Number( req.body.userId );
            const result = await CardService.removeMemberFromCard( cardId, userId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async updateCard( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const cardId = Number( req.params.cardId );
            const cardBody : Partial<CardBody> = req.body.cardName;
            const result = await CardService.updateCard( cardId, cardBody );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async deleteCard( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const cardId = Number( req.params.cardId );
            const result = await CardService.deleteCard( cardId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }
}
export default new CardController();
