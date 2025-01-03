import { mysqlSource } from '../configs/data-source.config.ts';
import { Card } from '../orm/entities/card.entity';
import { User } from '../orm/entities/user.entity.ts';

class CardRepository {
    private readonly cardRepository = mysqlSource.getRepository(Card);

    async getAllCards(): Promise<Card[] | null> {
        const cards = await this.cardRepository.find({
            select : ["id", "cardName"],
            order : {
                id : "asc"
            },
            relations : ["attachments", "todolists", "comments"]
        });
        return cards;
    }

    async getCardById( cardId : number ): Promise<Card | null> {
        const card = await this.cardRepository.findOne({
            select : ["id", "cardName"],
            where : {
                id : cardId
            },
            relations : ["attachments", "todolists", "comments"]
        });
        return card;
    }

    async getCardByName( name : string ): Promise<Card | null> {
        const card = await this.cardRepository.findOne({
            select : ["id", "cardName"],
            where : {
                cardName : name
            },
            relations : ["attachments", "todolists", "comments"]
        });
        return card;
    }

    async getAllcardsInList( listId :  number ): Promise<Card[] | null> {
        const cards = await this.cardRepository.find({
            select : ["id", "cardName"],
            order : {
                id : "asc"
            },
            where : {
                list : {
                    id : listId
                }
            },
            relations : ["attachments", "todolists", "comments"]
        });
        return cards;
    }

    async getCardByIdInList( listId : number, cardId : number ): Promise<Card | null> {
        const card = await this.cardRepository.findOne({
            select : ["id", "cardName"],
            where : {
                id : cardId,
                list : {
                    id : listId
                }
            },
            relations : ["attachments", "todolists", "comments"]
        });
        return card
    }

    async getCardByNameInList( listId : number, name : string ): Promise<Card | null> {
        const card = await this.cardRepository.findOne({
            select : ["id", "cardName"],
            where : {
                cardName : name,
                list : {
                    id : listId
                }
            },
            relations : ["attachments", "todolists", "comments"]
        });
        return card;
    }

    async addCard( card : Card ): Promise<Card | null> {
        const newCard =  this.cardRepository.create( card );
        await this.cardRepository.save( newCard );
        return newCard;
    }

    async updateCard( cardId : number, card : Partial<Card> ): Promise<void> {
        await this.cardRepository.update( cardId, card );
    }

    async deleteCard( cardId : number ): Promise<void> {
        await this.cardRepository.delete( cardId );
    }

    async getCardRelateWithUser( cardId : number ): Promise<Card | null> {
        const cards = await this.cardRepository.find({
            relations : ["users"],
            where : {
                id : cardId
            }
        });
        return cards[0];
    }

    async getCardsByListId( listId : number ): Promise<Card[] | null> {
        const cards = await this.cardRepository.find({
            select : ["id", "cardName"],
            relations : ["board"],
            where : {
                list : {
                    id : listId
                }
            }
        });
        return cards;
    }

    async addMemberToCard( card : Card, user : User ): Promise<void> {
        card.users.push( user );
        await this.cardRepository.save( card );
    }

    async removeMemberFromCard( card : Card, user : User ): Promise<void> {
        card.users = card.users.filter( u => u.id !== user.id );
        await this.cardRepository.save( card );
    }

}

export default new CardRepository();
