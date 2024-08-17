import { useState, useEffect } from "react"
import { remark } from 'remark';
import html from 'remark-html';
import parse from 'html-react-parser';

function MarkdownRenderer({ data }) {
    const [content, setContent] = useState("");

    useEffect(() => {
        const replacePlaceholders = (template, data) => {
            let result = template;
            for (const [key, value] of Object.entries(data)) {
                const regex = new RegExp(`{{${key}}}`, 'g');
                result = result.replace(regex, value);
            }
            return result;
        };

        fetch('/rfp-templates/template1.md')
            .then((response) => response.text())
            .then(template => {
                const newTemplate = replacePlaceholders(template, data);
                return remark().use(html).process(newTemplate);
            })
            .then(file => setContent(String(file)));
    }, [data]);
    return (
        <div>
            {parse(data)}
        </div>
    )
}

export default MarkdownRenderer;
