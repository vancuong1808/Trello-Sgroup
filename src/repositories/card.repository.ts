import { mysqlSource } from '../configs/data-source.config.ts';
import { Card } from '../orm/entities/card.entity';

class CardRepository {
    private readonly cardRepository = mysqlSource.getRepository(Card);

    async getAllcards(): Promise<Card[] | null> {
        const cards = await this.cardRepository.find({
            select : ["id", "cardName"],
            order : {
                id : "asc"
            }
        });
        return cards;
    }

    async getCardById( id : number ): Promise<Card | null> {
        const card = await this.cardRepository.findOne({
            select : ["id", "cardName"],
            where : {
                id : id
            }
        });
        return card
    }

    async getCardByName( name : string ): Promise<Card | null> {
        const card = await this.cardRepository.findOne({
            select : ["id", "cardName"],
            where : {
                cardName : name
            }
        });
        return card;
    }

    async addCard( card : Card ): Promise<Card | null> {
        const newCard =  this.cardRepository.create( card );
        await this.cardRepository.save( newCard );
        return newCard;
    }

    async updateCard( id : number, card : Partial<Card> ): Promise<void> {
        await this.cardRepository.update( id, card );
    }

    async deleteCard( id : number ): Promise<void> {
        await this.cardRepository.delete( id );
    }

    async getCardsByBoardId( boardId : number ): Promise<Card[] | null> {
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
    }
}

export default new CardRepository();
