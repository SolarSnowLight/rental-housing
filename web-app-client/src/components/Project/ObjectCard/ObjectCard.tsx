/* Библиотеки */
import React, { useRef } from "react";
import styled from "styled-components";

/* Компоненты */
import GalleryHorizontalScrollbar from "src/components/GalleryHorizontalScrollbar/GalleryHorizontalScrollbar";
import Arrow1DownIc from "src/components/icons/Arrow1DownIc";

/* Хуки */
import { useGalleryScrollbar } from "src/hooks/useScrollbar/useGalleryScrollbar";

/* Ресурсы */
import buildingDefault from "src/resources/images/building-default.png";

/* Утилиты */
import { wordUtils } from "src/utils/wordUtils";

/* Стили */
import css from "./ObjcectCard.module.scss";
import { commonStyled } from "src/styles/commonStyled";

/* Типы */
import { empty } from "src/types/empty";

/* Модели */
import { IObjectModel } from "src/models/Object/IObjectModel";
import { getDateLocale } from "src/utils/date";

export type ObjectInCard = {
  logo?: string | empty; // Ссылка на лого застройщика
  images?: string[] | empty; // Массив ссылок на изображения
  title: string;
  date_delivery?: string | number;
  count_objects?: number;
};

export type ObjectCardProps = {
  object: ObjectInCard;
  select: boolean;
  clickHandler: () => {};
};

const ObjectCard = (props: ObjectCardProps) => {
  const object = { ...props.object };
  object.images ??= [buildingDefault];

  const elementCount = object.images.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [
    scrollProps,
    onContainerScroll,
    setContainerScroll,
    scrollToElementByIndex,
  ] = useGalleryScrollbar(containerRef, contentRef, elementCount);

  return (
		<div
    		className={css.frame}
    		style={{
    			border: props.select ? "blue 2px solid" : "2px solid #424041",
    		}}
    		onClick={(e) => {
    			props.clickHandler();
    		}}
		>
    		<div
    			className={css.imagesFrame}
    			ref={containerRef}
    			onScroll={onContainerScroll}
    		>
				<div 
					className={css.contentContainer} ref={contentRef}>
    				{object.images.map((it) => (
    					<div key={it} className={css.imageContainer}>
        					<img className={css.imageBgc} src={it} alt={"Building"} />
        					<div className={css.blur} />
        					<img className={css.image} src={it} alt={"Building"} />
    					</div>
    				))}
				</div>
      </div>

      <div className={css.controlElementsContainer}>
    		{elementCount >= 2 && (
    			<GalleryHorizontalScrollbar
        			className={css.scroll}
            		scrollProps={scrollProps}
            		setContainerScroll={setContainerScroll}
            		scrollToElementByIndex={scrollToElementByIndex}
          		/>
    		)}
      </div>

    	{object.logo && (
    		<img className={css.logo} src={object.logo} alt="Builder Logo" />
    	)}

    	<div className={css.name}>{object.title}11</div>
      		{object.date_delivery && (
        		<div className={css.year}>
          			Сдача {getDateLocale(object.date_delivery as string)}
        		</div>
      		)}
      		{object.count_objects && (
        		<div className={css.count}>
          			{object.count_objects} {wordUtils.objectsPlural(object.count_objects)}
        		</div>
      		)}
    	</div>
	);
};

export default React.memo(ObjectCard) as unknown as typeof ObjectCard;
