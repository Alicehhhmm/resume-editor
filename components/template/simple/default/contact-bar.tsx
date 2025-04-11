import type { FC } from 'react'

import { Linkedin, Mail, MapPin, Phone } from 'lucide-react'

interface ContactBarProps {
    phone: string
    email: string
    location: string
    linkedin: string
}

const ContactBar: FC<ContactBarProps> = ({
    phone,
    email,
    location,
    linkedin,
}) => {
    return (
        <div className="bg-muted px-8 py-3 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <div className="flex items-center gap-1">
                <Phone size={14} className="text-primary" />
                <span>{phone}</span>
            </div>
            <div className="flex items-center gap-1">
                <Mail size={14} className="text-primary" />
                <span>{email}</span>
            </div>
            <div className="flex items-center gap-1">
                <MapPin size={14} className="text-primary" />
                <span>{location}</span>
            </div>
            <div className="flex items-center gap-1">
                <Linkedin size={14} className="text-primary" />
                <span>{linkedin}</span>
            </div>
        </div>
    )
}

export default ContactBar
