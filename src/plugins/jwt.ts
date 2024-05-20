import jwt, { JwtPayload } from 'jsonwebtoken';

const publicKey = `-----BEGIN PUBLIC KEY-----
MIICITANBgkqhkiG9w0BAQEFAAOCAg4AMIICCQKCAgBxm3o8WSp+GFr9YObWx534
zAdt02t5NJnKMGwPRzU0J/PoERDShpl97x6vlbFmIL82zr42WSHlddCWUpRNs1cf
kZ9rn5fvXsumUn55OYcw/RvsnVwiaQY22K1rcm985wxEKO5ASxKKv1BLjuYU4r6g
W5dFjxCDBxPhYvifYhfXUaRFNC/R/TMi3fptbnUvgmgDj0dc7tEGd7wcOwR0vbBU
up/SZRXAQFTVHlnhBZWnEbTmBWw7+mzWjIYBitI9HmIFIFFzUsTmnorMO4hPKnPZ
wVfeWEfZLLGRw03/fjzsP0WmLmFPvgmV68ld1BbZllo96wuQ36/sv05YWBhqnmlX
QLTaiC7mqqVpKvfmXaTs5RnFDBJdIAvVOwSNNWHPtC5Haa8B8UGbTQId9MbjmFPi
UHPz/hPfLjCmhXTcbcfSCQMB6loJmi16VioWSRODM5I858pDo3QroV2EjRZHFB+d
FH27wsaT4GH6mzk0zVPPh8CPVwxo+HfCFbQLr6nffc3D6jN+4QnFytQBlk6jd04A
2MvPqCM4LO0pHr83515tyEgKI55OYrBIsrVhf26EiTXyBXYYiyReFac7vZF3jRm4
XHEps8z3a09dRbhOISAvmZ8Q0jCCfto3Z9BEOggE5D/LyAMHcQHLR+1EaN/xjtPh
Z4RurFGIU0PZOeCy/61jPwIDAQAB
-----END PUBLIC KEY-----`;

export function verifyJwt(token: string): JwtPayload | null {
    try {
        const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
        return decoded as JwtPayload;
    } catch (error) {
        console.error('Failed to verify JWT', error);
        return null;
    }
}