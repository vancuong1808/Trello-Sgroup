import { CardBody } from '../common/typings/custom.interface';
import { conflictError, notFoundError } from "../handlers/errors/customError.ts";
import { Result } from '../handlers/result.handler.ts';
import { Card } from '../orm/entities/card.entity.ts';
import { ActivityLog } from '../orm/entities/activitylog.entity.ts';
import ActivitylogRepository from '../repositories/activitylog.repository.ts';
import CardRepository from '../repositories/card.repository.ts';
import ListRepository from '../repositories/list.repository.ts';
import UserRepository from '../repositories/user.repository.ts';

class CardService {
    async getAllCards( ) : Promise<Result> {
        const cards = await CardRepository.getAllCards();
        if (!cards) {
            throw new notFoundError("Cards not found");
        }
        return new Result( true, 200, "Get all cards successful", cards );
    }

    async getCardById( cardId : number ) : Promise<Result> {
        const card = await CardRepository.getCardById( cardId );
        if (!card) {
            throw new notFoundError("Card not found");
        }
        return new Result( true, 200, "Get card successful", card );
    }

    async addCard( listId : number, userId : string, card : CardBody ) : Promise<Result> {
        const isExistedList = await ListRepository.getListById( listId );
        if (!isExistedList) {
            throw new notFoundError("List not found");
        }
        const isExistedCard = await CardRepository.getCardByName( card.cardName );
        if (isExistedCard) {
            throw new conflictError("Card already existed");
        }
        const isExistedUser = await UserRepository.getUserById( Number( userId ) );
        if (!isExistedUser) {
            throw new notFoundError("User not found");
        }
        const newCard = new Card();
        newCard.cardName = card.cardName;
        newCard.list = isExistedList;
        newCard.users = [];
        newCard.users.push( isExistedUser );
        await CardRepository.addCard( newCard );
        const newActivityLog = new ActivityLog();
        newActivityLog.description = `Create card ${newCard.cardName} in list ${isExistedList.listName}`;
        newActivityLog.user = isExistedUser;
        newActivityLog.workspace = isExistedList.board.workspace;
        newActivityLog.board = isExistedList.board;
        await ActivitylogRepository.addActivityLog( newActivityLog );
        return new Result( true, 201, "Create card successful", { wordSpaceId : isExistedList.board.workspace.id, boardId : isExistedList.board.id, Log : newActivityLog.description } );
    }

    async addMemberToCard( cardId : number, userId : number ) : Promise<Result> {
        const isExistedCard = await CardRepository.getCardById( cardId );
        if (!isExistedCard) {
            throw new notFoundError("Card not found");
        }
        const isExistedUser = await UserRepository.getUserById( Number( userId ) );
        if (!isExistedUser) {
            throw new notFoundError("User not found");
        }
        const isExistedUserInCard = isExistedCard.users.some( (user) => user.id === isExistedUser.id );
        if (isExistedUserInCard) {
            throw new conflictError("User already in card");
        }
        const isUserInBoard = isExistedCard.list.id;
        const isUserInBoardList = await ListRepository.getListById( isUserInBoard );
        if (!isUserInBoardList) {
            throw new notFoundError("User not in board");
        }
        const isUserInBoardUser = isUserInBoardList.board.userBoards.some( (user) => user.user.id === isExistedUser.id );
        if (!isUserInBoardUser) {
            throw new notFoundError("User not in board");
        }
        await CardRepository.addMemberToCard( isExistedCard, isExistedUser );
        return new Result( true, 200, "Add member to card successful" );
    }

    async removeMemberFromCard( cardId : number, userId : number ) : Promise<Result> {  
        const isExistedCard = await CardRepository.getCardById( cardId );
        if (!isExistedCard) {
            throw new notFoundError("Card not found");
        }
        const isExistedUser = await UserRepository.getUserById( Number( userId ) );
        if (!isExistedUser) {
            throw new notFoundError("User not found");
        }
        const isExistedUserInCard = isExistedCard.users.some( (user) => user.id === isExistedUser.id );
        if (!isExistedUserInCard) {
            throw new notFoundError("User not in card");
        }
        await CardRepository.removeMemberFromCard( isExistedCard, isExistedUser );
        return new Result( true, 200, "Remove member from card successful" );
    }
    

    async updateCard( cardId : number, card : Partial<Card> ) : Promise<Result> {
        const isExistedCard = await CardRepository.getCardById( cardId );
        if (!isExistedCard) {
            throw new notFoundError("Card not found");
        }
        await CardRepository.updateCard( cardId, card );
        return new Result( true, 200, "Update card successful" );
    }

    async deleteCard( cardId : number ) : Promise<Result> {
        const isExistedCard = await CardRepository.getCardById( cardId );
        if (!isExistedCard) {
            throw new notFoundError("Card not found");
        }
        await CardRepository.deleteCard( cardId );
        return new Result( true, 200, "Delete card successful" );
    }
}
export default new CardService();