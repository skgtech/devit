module Jekyll
  class WorkshopsGenerator < Generator
    def generate(site)
      site.data['allDay'].each do | year, data |
        data['allDay'].each do | workshop |
          site.pages << WorkshopPage.new(site, "workshops-all-day", year, workshop)
        end
        data['open'].each do | openWorkshops |
          site.pages << WorkshopPage.new(site, "workshops-open", year, openWorkshops)
        end
      end
    end
  end

  class WorkshopPage < Page
    def initialize(site, type, year, workshop)
      if !workshop['url']
        return
      end
      @site = site
      @base = "/"
      @dir = type + "/" + year + "/" + workshop['url']
      @name = 'index.html'
      self.process(@name)
      self.read_yaml(File.join(@base, '_includes'), 'workshop.single-page.html')
      self.data['workshop'] = workshop
      self.data['year'] = year
      self.data['title'] = "DEVit :: #{ workshop['name'] } - #{ workshop['title'] }"
      self.data['ogTitle'] = "DEVit :: #{ workshop['name'] } - #{ workshop['title'] }"
      self.data['ogDescription'] = "#{ workshop['description'].gsub(/<\/?[^>]*>/, "")[0, 150] } ..."
      self.data['ogImage'] = "#{ workshop['speakerPhoto'] }"
    end
  end

end
