import { Result } from '../handlers/result.handler.ts';
import { conflictError, notFoundError } from "../handlers/errors/customError.ts";
import { Card } from '../orm/entities/card.entity.ts';
import CardRepository from '../repositories/card.repository.ts';
import BoardRepository from '../repositories/board.repository.ts';
import { CardBody } from '../common/typings/custom.interface';


class CardService {

    async getAllCards() : Promise<Result> {
        try {
            const cards = await CardRepository.getAllcards();
            return new Result( true, 200, "Get all cards successful", { cards } );
        } catch (error) {
            throw error;
        }
    }

    async getCardById( id : number ) : Promise<Result> {
        try {
            const card = await CardRepository.getCardById( id );
            if (!card) {
                throw new notFoundError("Card not found");
            }
            return new Result( true, 200, "Get card successful", { card } );
        } catch (error) {
            throw error;
        }
    }

    async getCardByName( name : string ) : Promise<Result> {
        try {
            const card = await CardRepository.getCardByName( name );
            if (!card) {
                throw new notFoundError("Card not found");
            }
            return new Result( true, 200, "Get card successful", { card } );
        } catch (error) {
            throw error;
        }
    }

    async addCard( card : CardBody ) : Promise<Result> {
        try {
            const isExistedBoard = await BoardRepository.getBoardById( card.boardId );
            if (!isExistedBoard) {
                throw new notFoundError("Board not found");
            }
            const isExistedCard = await CardRepository.getCardByName( card.cardName );
            if (isExistedCard) {
                throw new conflictError("Card already existed");
            }
            const newCard = new Card();
            newCard.cardName = card.cardName;
            newCard.board = isExistedBoard;
            await CardRepository.addCard( newCard );
            return new Result( true, 201, "Create card successful", { newCard } );
        } catch (error) {
            throw error;
        }
    }

    async updateCard( id : number, card : Partial<Card> ) : Promise<Result> {
        try {
            const isExistedCard = await CardRepository.getCardById( id );
            if (!isExistedCard) {
                throw new notFoundError("Card not found");
            }
            await CardRepository.updateCard( id, card );
            return new Result( true, 200, "Update card successful" );
        } catch (error) {
            throw error;
        }
    }

    async deleteCard( id : number ) : Promise<Result> {
        try {
            const isExistedCard = await CardRepository.getCardById( id );
            if (!isExistedCard) {
                throw new notFoundError("Card not found");
            }
            await CardRepository.deleteCard( id );
            return new Result( true, 200, "Delete card successful", { isExistedCard } );
        } catch (error) {
            throw error;
        }
    }
}

export default new CardService();
