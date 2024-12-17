const API_END_POINT = process.env.REACT_APP_API_END_POINT;

const TRUE_TEST =
    `2 - bromo - 2 - nitropropane - 1 3 - diol(T.R.U.E.TEST)
    bacitracin(T.R.U.E.TEST)
    balsam of peru(T.R.U.E.TEST)
    black rubber mix(T.R.U.E.TEST)
    budesonide(T.R.U.E.TEST)
    caine mix(T.R.U.E.TEST)
    carba mix(T.R.U.E.TEST)
    cl + me - isothiazolinone(T.R.U.E.TEST)
    cobalt dichloride(T.R.U.E.TEST)
    colophony(T.R.U.E.TEST)
    diazolidinyl urea(T.R.U.E.TEST)
    disperse blue 106(T.R.U.E.TEST)
    epoxy resin(T.R.U.E.TEST)
    ethylenediamine dihydrochloride(T.R.U.E.TEST)
    formaldehyde(T.R.U.E.TEST)
    fragrance mix(T.R.U.E.TEST)
    gold sodium thiosulfate(T.R.U.E.TEST)
    hydrocortisone - 17 - butyrate(T.R.U.E.TEST)
    imidazolidinyl urea(T.R.U.E.TEST)
    mercapto mix(T.R.U.E.TEST)
    mercaptobenzothiazole(T.R.U.E.TEST)
    methyldibromo glutaronitrile(T.R.U.E.TEST)
    negative control(T.R.U.E.TEST)
    neomycin sulfate(T.R.U.E.TEST)
    nickel sulfate(T.R.U.E.TEST)
    p - phenylenediamine(T.R.U.E.TEST)
    p - tert butylphenol formaldehyde resin(T.R.U.E.TEST)
    paraben mix(T.R.U.E.TEST)
    parthenolide(T.R.U.E.TEST)
    potassium dichromate(T.R.U.E.TEST)
    quaternium - 15(T.R.U.E.TEST)
    quinoline mix(T.R.U.E.TEST)
    thimerosal(T.R.U.E.TEST)
    thiuram Mix(T.R.U.E.TEST)
    tixocortol - 21 - pivalate(T.R.U.E.TEST)
    wool alcohols(T.R.U.E.TEST)`

const IGNORE_ITEM = {
    trueTest: '1 2 3 4 5 67 8 9 10 11 12',
    nonTrueTest: '1 2 3 4 56 7 8 9 10',
}

export {
    API_END_POINT,
    TRUE_TEST,
    IGNORE_ITEM,
};
