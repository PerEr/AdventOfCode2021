export { };

// https://adventofcode.com/2021/day/16

const values = `620D79802F60098803B10E20C3C1007A2EC4C84136F0600BCB8AD0066E200CC7D89D0C4401F87104E094FEA82B0726613C6B692400E14A305802D112239802125FB69FF0015095B9D4ADCEE5B6782005301762200628012E006B80162007B01060A0051801E200528014002A118016802003801E2006100460400C1A001AB3DED1A00063D0E25771189394253A6B2671908020394359B6799529E69600A6A6EB5C2D4C4D764F7F8263805531AA5FE8D3AE33BEC6AB148968D7BFEF2FBD204CA3980250A3C01591EF94E5FF6A2698027A0094599AA471F299EA4FBC9E47277149C35C88E4E3B30043B315B675B6B9FBCCEC0017991D690A5A412E011CA8BC08979FD665298B6445402F97089792D48CF589E00A56FFFDA3EF12CBD24FA200C9002190AE3AC293007A0A41784A600C42485F0E6089805D0CE517E3C493DC900180213D1C5F1988D6802D346F33C840A0804CB9FE1CE006E6000844528570A40010E86B09A32200107321A20164F66BAB5244929AD0FCBC65AF3B4893C9D7C46401A64BA4E00437232D6774D6DEA51CE4DA88041DF0042467DCD28B133BE73C733D8CD703EE005CADF7D15200F32C0129EC4E7EB4605D28A52F2C762BEA010C8B94239AAF3C5523CB271802F3CB12EAC0002FC6B8F2600ACBD15780337939531EAD32B5272A63D5A657880353B005A73744F97D3F4AE277A7DA8803C4989DDBA802459D82BCF7E5CC5ED6242013427A167FC00D500010F8F119A1A8803F0C62DC7D200CAA7E1BC40C7401794C766BB3C58A00845691ADEF875894400C0CFA7CD86CF8F98027600ACA12495BF6FFEF20691ADE96692013E27A3DE197802E00085C6E8F30600010882B18A25880352D6D5712AE97E194E4F71D279803000084C688A71F440188FB0FA2A8803D0AE31C1D200DE25F3AAC7F1BA35802B3BE6D9DF369802F1CB401393F2249F918800829A1B40088A54F25330B134950E0`;


class BitStream { 

    bits: string;
    offset: number;

    constructor(indata: string) { 
        const hex = '0123456789ABCDEF';
        this.bits = indata
            .split('')
            .map((c) => hex.indexOf(c))
            .map((v) => ("0000" + v.toString(2)).slice(-4))
            .join('');
        this.offset = 0;
    }  
    
    isEmpty() {
        return !this.bits.substring(this.offset).split('').some((c) => c !== '0');        
    }

    take(bits: number) {
        const part = this.bits.substring(this.offset, this.offset + bits);
        this.offset += bits;
        return parseInt(part, 2);
    }

    takeStream(bits: number) {
        const bs = new BitStream('');
        bs.bits = this.bits.substring(this.offset, this.offset + bits);
        bs.offset = 0;
        this.offset += bits;
        return bs;
    }
 }

 const consumePacket = (bs: BitStream) => {
    const version = bs.take(3);
    const type = bs.take(3);
    let sum  = version;
    if (type === 4) {
        let f = 0;
        let v = 0;
        do {
            f = bs.take(1);
            v = v * 16 + bs.take(4);
        } while (f === 1);
        console.log(version, type, '#', v);
    } else {
        const mode = bs.take(1);
        if (mode === 0) {
            const len = bs.take(15);                
            console.log(version, type, 'I', len);
            const inner = bs.takeStream(len);
            sum += consumeStream(inner);        
        } else {
            const nr = bs.take(11);
            for (let k=0 ; k<nr ; ++k) {
                sum += consumePacket(bs);
            }
        }
    }
    return sum;
}

const consumeStream = (bs: BitStream) => {
    let sum = 0;
    while (!bs.isEmpty()) {
        sum += consumePacket(bs);
    }
    return sum;
}

const s = consumeStream(new BitStream(values));
console.log('sum', s);