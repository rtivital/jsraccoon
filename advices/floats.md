# Ненужное свойство display: block
Не используйте свойство `display: block` для плавающих элементов - они автоматически становятся блочными.
```css
 .float-left {
	display: block; /* ненужное свойство */
	float: left;
} 

.float-left {
	float: left;
}
```