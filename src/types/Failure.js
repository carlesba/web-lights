const Failure = reason => ({ reason })

export const NoInternet = Failure('NoInternet')
export const CannotFindLocalConfig = Failure('CannotFindLocalConfig')
export const CannotCreateApp = Failure('CannotCreateApp')
export const CannotSyncHue = Failure('CannotSyncHue')
export const PressLinkButton = Failure('PressLinkButton')
