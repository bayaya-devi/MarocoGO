import { Heart, Star, ArrowUpRight, Search, MapPin } from 'lucide-react';
import type { PropsWithChildren } from 'react';

export const Button=({children,variant='primary',onClick,type='button',disabled=false}:PropsWithChildren<{variant?:'primary'|'ghost'|'glass';onClick?:()=>void;type?:'button'|'submit';disabled?:boolean}>)=><button type={type} onClick={onClick} disabled={disabled} className={`btn btn-${variant}`}>{children}</button>;
export const IconButton=({icon:Icon,label,onClick,active=false}:{icon:any,label:string,onClick?:()=>void,active?:boolean})=><button aria-label={label} onClick={onClick} className={`icon-btn ${active?'active':''}`}><Icon size={18}/><span>{label}</span></button>;
export const Rating=({value}:{value:number})=><span className="rating"><Star size={14} fill="currentColor"/> {value.toFixed(1)}</span>;
export const SearchBar=({onClick}:{onClick?:()=>void})=><button className="searchbar" onClick={onClick}><Search size={20}/><span>Où voulez-vous aller ?</span><span className="search-shortcut">Explorer</span></button>;
export const SectionTitle=({eyebrow,title,action}:{eyebrow?:string,title:string,action?:string})=><div className="section-head"><div>{eyebrow&&<p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2></div>{action&&<button className="text-link">{action} <ArrowUpRight size={16}/></button>}</div>;
export const LocationPill=({city}:{city:string})=><span className="location-pill"><MapPin size={13}/>{city}</span>;
export const Fav=({active,onClick}:{active:boolean,onClick:()=>void})=><button onClick={onClick} className={`round-fav ${active?'active':''}`} aria-label="Ajouter aux favoris"><Heart size={18} fill={active?'currentColor':'none'}/></button>;
