module Jekyll
  class RenderNoteTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @text = text
    end

    def render(context)
      "<div class=\"alert alert-info\" role=\"alert\">#{context}</div>"
    end
  end
end

Liquid::Template.register_tag('render_note', Jekyll::RenderNoteTag)
