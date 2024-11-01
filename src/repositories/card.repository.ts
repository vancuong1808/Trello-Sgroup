import { mysqlSource } from '../configs/data-source.config.ts';
import { badRequestError } from "../handlers/errors/customError";
import { Card } from '../orm/entities/card.entity';

class CardRepository {
    private readonly cardRepository = mysqlSource.getRepository(Card);

    async getAllCards(): Promise<Card[] | null> {
        try {
            const cards = await this.cardRepository.find({
                select : ["id", "cardName"],
                order : {
                    id : "ASC"
                }
            });
            return cards;
        } catch (error) {
            throw new badRequestError(`CardRepository has error : ${ error }`);
        }
    }

    async getCardById( id : number ): Promise<Card | null> {
        try {
            const card = await this.cardRepository.findOne({
                select : ["id", "cardName"],
                where : {
                    id : id
                }
            });
            return card
        } catch (error) {
            throw new badRequestError(`CardRepository has error : ${ error }`);
        }
    }

    async getCardByName( name : string ): Promise<Card | null> {
        try {
            const card = await this.cardRepository.findOne({
                select : ["id", "cardName"],
                where : {
                    cardName : name
                }
            });
            return card;
        } catch (error) {
            throw new badRequestError(`CardRepository has error : ${ error }`);
        }
    }

    async addCard( card : Card ): Promise<Card | null> {
        try {
            const newCard = await this.cardRepository.create( card );
            await this.cardRepository.save( newCard );
            return newCard;
        } catch (error) {
            throw new badRequestError(`CardRepository has error : ${ error }`);
        }
    }

    async updateCard( id : number, card : Partial<Card> ): Promise<void> {
        try {
            const updatedCard = await this.cardRepository.update( id, card );
            if (!updatedCard) {
                throw new badRequestError("Update card failed");
            }
        } catch (error) {
            throw new badRequestError(`CardRepository has error : ${ error }`);
        }
    }

    async deleteCard( id : number ): Promise<void> {
        try {
            const deletedCard = await this.cardRepository.delete( id );
            if (!deletedCard) {
                throw new badRequestError("Delete card failed");
            }
        } catch (error) {
            throw new badRequestError(`CardRepository has error : ${ error }`);
        }
    }

    async getCardsByBoardId( boardId : number ): Promise<Card[] | null> {
        try {
            const cards = await this.cardRepository.find({
                select : ["id", "cardName"],
                relations : ["board"],
                where : {
                    board : {
                        id : boardId
                    }
                }
            });
            return cards;
        } catch (error) {
            throw new badRequestError(`CardRepository has error : ${ error }`);
        }
    }
}

export default new CardRepository();