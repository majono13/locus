import { UserTypeEnum } from "../enums/user-type.enum";

export const MENU_OPTIONS: MenuOptions[] = [
    {
        id: 'properties',
        item: 'Meus imóveis',
        children: [],
        permissions: [UserTypeEnum.COMMUN],
        main: true,
        router: '/public/commun/properties',
        icon: 'pi pi-home'
    },
    {
        id: 'configurations',
        item: 'Configurações',
        children: [
            {
                id: 'userData',
                item: 'Meus dados',
                permissions: [UserTypeEnum.COMMUN, UserTypeEnum.ADMIN, UserTypeEnum.BROKER],
                router: '',
                icon: 'pi pi-user',
                main: false,
                children: []
            }
        ],
        permissions: [UserTypeEnum.COMMUN, UserTypeEnum.ADMIN, UserTypeEnum.BROKER],
        main: true,
        router: '',
        icon: 'pi pi-cog'
    }
];

export interface ChildrenOptions {
    id: string;
    item: string;
    permissions: UserTypeEnum[];
    router: string;
    icon?: string;
}
export interface MenuOptions {
    id: string;
    item: string;
    permissions: UserTypeEnum[];
    router: string;
    main: boolean;
    icon?: string;
    children: MenuOptions[]
}