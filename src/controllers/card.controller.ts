import responseHandler from "../handlers/response.handler";
import { NextFunction, Request, Response } from "express";
import { CardBody } from "../common/typings/custom.interface";
import CardService from "../services/card.service";

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
            const cardId = Number( req.params.id );
            const result = await CardService.getCardById( cardId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async getCardByName( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const cardName = req.params.name;
            const result = await CardService.getCardByName( cardName );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async addCard( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const cardBody : CardBody = req.body;
            const result = await CardService.createCard( cardBody );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async updateCard( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const cardId = Number( req.params.id );
            const cardBody : Partial<CardBody> = req.body;
            const result = await CardService.updateCard( cardId, cardBody );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

    async deleteCard( req : Request, res : Response, next : NextFunction ) : Promise<void> {
        try {
            const cardId = Number( req.params.id );
            const result = await CardService.deleteCard( cardId );
            responseHandler.ok( res, result.message, result.data || {} );
        } catch (error) {
            next( error );
        }
    }

}

export default new CardController();