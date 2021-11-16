import {verifyUnsignedTransaction} from '../verifyUnsignedTransaction';
import {Transaction} from '../../../typings/transaction';

describe('verifyUnsignedTransaction', () => {

    it('does not throw on matching transactions', () => {
        const transaction: Transaction = {
            senderPublicKey: '7210b8941929030324540238450e985899989a7ad0267e0c76f668fde3b1016b',
            subtype: 0,
            type: 0,
            recipient: '2402520554221019656',
            amountNQT: '100000000',
            feeNQT: '73500000',
            deadline: 1440
        };

        expect(() => {
            verifyUnsignedTransaction(transaction, '00107250880da0057210b8941929030324540238450e985899989a7ad0267e0c76f668fde3b1016b0822eb07b777572100e1f50500000000608561040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000295e0500247826166430d2c5010c00008054657374204d657373616765');
        }).not.toThrow();
    });

    it('does not throw on partially matching transactions', () => {
        const transaction: Transaction = {
            senderPublicKey: '7210b8941929030324540238450e985899989a7ad0267e0c76f668fde3b1016b',
            subtype: 0,
            type: 0,
            recipient: '2402520554221019656',
            amountNQT: '100000000',
        };

        expect(() => {
            verifyUnsignedTransaction(transaction, '00107250880da0057210b8941929030324540238450e985899989a7ad0267e0c76f668fde3b1016b0822eb07b777572100e1f50500000000608561040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000295e0500247826166430d2c5010c00008054657374204d657373616765');
        }).not.toThrow();
    });

    it('does throw on not matching transactions', () => {
        const transaction: Transaction = {
            senderPublicKey: '7210b8941929030324540238450e985899989a7ad0267e0c76f668fde3b1016b',
            subtype: 0,
            type: 0,
            recipient: '2402520554221019656',
            amountNQT: '2500000000', // wrong value
            feeNQT: '73500000',
            deadline: 1440
        };

        expect(() => {
            verifyUnsignedTransaction(transaction, '00107250880da0057210b8941929030324540238450e985899989a7ad0267e0c76f668fde3b1016b0822eb07b777572100e1f50500000000608561040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000295e0500247826166430d2c5010c00008054657374204d657373616765');
        }).toThrow();
    });

});
