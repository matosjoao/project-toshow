import { forwardRef } from 'react';
import { IconBxsMessageAltDetail, IconCalendarEventFill, IconCalendarDays, IconUsers, IconClipboardList, IconFootball, IconScoreboard, IconWhistle, IconFileBlank } from '../icons';

function getTemplateIconByType(name: string) {
    switch (name) {
        case 'match-day':
            return IconCalendarEventFill;
        case 'next-match':
            return IconCalendarDays;
        case 'game-lineup':
            return IconUsers;
        case 'game-squadlist':
            return IconClipboardList;
        case 'game-message':
            return IconBxsMessageAltDetail;
        case 'game-goal':
            return IconFootball;
        case 'game-start-time':
            return IconScoreboard;
        case 'game-half-time':
            return IconScoreboard;
        case 'game-full-time':
            return IconWhistle;
        case 'other':
            return IconFileBlank;
        default:
            return null;
    }
}

function getTemplateColorByType(name: string) {
    switch (name) {
        case 'match-day':
            return "text-orange-600";
        case 'next-match':
            return "text-teal-600";
        case 'game-lineup':
            return "text-purple-600";
        case 'game-squadlist':
            return "text-blue-600";
        case 'game-message':
            return "text-gray-600";
        case 'game-goal':
            return "text-green-600";
        case 'game-start-time':
            return "text-yellow-600";
        case 'game-half-time':
            return "text-cyan-600";
        case 'game-full-time':
            return "text-pink-600";
        case 'other':
            return "text-indigo-600";
        default:
            return "text-gray-600";
    }
}

function getTemplatePaddingByType(name: string) {
    switch (name) {
        case 'match-day':
        case 'next-match':
            return "p-4";
        case 'game-lineup':
        case 'game-squadlist':
        case 'game-message':
        case 'game-goal':
        case 'game-start-time':
        case 'game-half-time':
        case 'game-full-time':
        case 'other':
            return "p-3";
        default:
            return "p-3";
    }
}

interface Props {
    title: string;
    name: string;
    onClick: () => void;
}

type Ref = HTMLSpanElement;

const TemplateCategoryRowItem = forwardRef<Ref, Props>(({title, name, onClick}, ref) => {
    const Icon = getTemplateIconByType(name);
    const color = getTemplateColorByType(name);
    const padding = getTemplatePaddingByType(name);
    
    return (
        <button className="flex flex-none flex-col h-auto w-28 m-2 items-center hover:scale-110" onClick={onClick}>
            <div className={`flex items-center h-14 w-14 rounded-full bg-white ${color} ${padding}`}>
                { Icon && <Icon />}
            </div>
            <span ref={ref} className="text-white pt-2 font-semibold text-sm">{title}</span>
        </button>
    );
});

export default TemplateCategoryRowItem;
