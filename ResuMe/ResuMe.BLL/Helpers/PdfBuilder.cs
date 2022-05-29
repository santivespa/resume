using System;
using System.Collections.Generic;
using System.IO;
using System.Web.Mvc;
using Curriculum.Model.Users;
using iText.IO.Font;
using iText.IO.Font.Constants;
using iText.IO.Image;
using iText.Kernel.Colors;
using iText.Kernel.Font;
using iText.Kernel.Geom;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas.Draw;
using iText.Layout;
using iText.Layout.Borders;
using iText.Layout.Element;
using iText.Layout.Properties;


namespace Curriculum.BLL.Helpers
{
    public class PdfBuilder
    {


        public byte[] ManipulatePdf(User user)
        {


            byte[] pdfBytes;
            var stream = new MemoryStream();
            var wri = new PdfWriter(stream);
            var pdf = new PdfDocument(wri);
            var doc = new Document(pdf);

            AddHeader(ref doc, user);

            AddLanguages(ref doc, user);
            AddEducation(ref doc, user);
            AddExperience(ref doc, user);
            
            //Skills
            AddTechnologies(ref doc, user);
            AddTools(ref doc, user);
            AddMethodologies(ref doc, user);

            //Proyects

            AddProyects(ref doc, user);
            doc.Close();
            pdfBytes = stream.ToArray();


            return pdfBytes;


        }

        //Header
        private void AddHeader(ref Document doc, User user)
        {
            Table table = new Table(2);

            if (!String.IsNullOrEmpty(user.ProfileImage)){
                Cell cellProfileImage = new Cell(1, 1)
                  .SetPadding(0)
                  .Add(new Image(ImageDataFactory
                          .Create(user.ProfileImage))
                          .SetBorderRadius(new BorderRadius(50))
                          .SetHeight(70).SetWidth(70))
                  .SetBorder(Border.NO_BORDER);
                table.AddCell(cellProfileImage);
            }
          


            Table tableUserInfo = new Table(1);


     
            Table tableNameYears = new Table(2);
            tableNameYears.AddCell(new Cell(1, 1)
                .SetPadding(0)
                .SetPaddingLeft(12)
                .SetBorder(Border.NO_BORDER)
                .Add(this.BoldParagraph(user.FullName)
                    .SetFontSize(16)));

            if (user.Birthdate != null)
            {
                int years = CalculateYears(Convert.ToDateTime(user.Birthdate));
                tableNameYears.AddCell(new Cell(1, 1)
               .SetPadding(0)
                .SetPaddingLeft(8)
               .SetVerticalAlignment(VerticalAlignment.MIDDLE)
               .SetBorder(Border.NO_BORDER)
               .Add(
                   new Paragraph($"{years} years old")
                   .SetFontSize(14)
                   .SetFontColor(new DeviceRgb(128, 128, 128)))
                   .SetVerticalAlignment(VerticalAlignment.MIDDLE)
               );
            }
           


            Table tableRoleExperience = new Table(2);
            if (!String.IsNullOrEmpty(user.Role))
            {
                tableRoleExperience.AddCell(
              new Cell(1, 1)
              .SetPadding(0)
              .SetPaddingLeft(12)
              .SetBorder(Border.NO_BORDER)
              .Add(
                  this.BoldParagraph(user.Role)
                  .SetFontSize(14)
                  .SetFontColor(new DeviceRgb(109, 158, 235)))
              );
            }
            if (user.YearsOfExperience>0)
            {
                tableRoleExperience.AddCell(
               new Cell(1, 1)
               .SetPadding(0)
               .SetPaddingLeft(8)
               .SetBorder(Border.NO_BORDER)
               .SetVerticalAlignment(VerticalAlignment.MIDDLE)
               .Add(
                   new Paragraph(user.YearsOfExperience+" "+(user.YearsOfExperience==1?"year":"years")+" of experience")
                   .SetFontSize(14)
                   .SetFontColor(new DeviceRgb(128, 128, 128)))
               );
            }

               




            tableUserInfo.AddCell(new Cell(1, 1).SetPadding(0).Add(tableNameYears).SetBorder(Border.NO_BORDER));
            tableUserInfo.AddCell(new Cell(1, 1).SetPadding(0).Add(tableRoleExperience).SetBorder(Border.NO_BORDER));
            tableUserInfo.AddCell(new Cell(1, 1).SetPadding(0)
                 .SetPaddingLeft(12)
                 .SetBorder(Border.NO_BORDER)
                 .Add(
                new Paragraph(user.Email)
                .SetFontSize(14)
            ));


            Cell cellUserInfo = new Cell(1, 1).SetPadding(0).Add(tableUserInfo).SetBorder(Border.NO_BORDER);

           
            table.AddCell(cellUserInfo);

            doc.Add(table);
        }

        private void AddLanguages(ref Document doc, User user)
        {
            if (user.Curriculum.Languages.Count > 0)
            {
                Paragraph subHeader = this.BoldParagraph("Languages")
                    .SetFontSize(14)
                    .SetMarginTop(12)
                    .SetMarginBottom(-2);
                doc.Add(subHeader);
                LineSeparator ls = new LineSeparator(new SolidLine());
                doc.Add(ls);
                Table table = new Table(1);
                user.Curriculum.Languages.ForEach(x =>
                {
                    Cell cell1 = new Cell(1, 1)
                        .Add(new Paragraph($"{x.LanguageName} - {x.Nivel.ToString()}")).SetBorder(Border.NO_BORDER);

                    table.AddCell(cell1);

                });
                doc.Add(table);
            }
    
        }
        private void AddEducation(ref Document doc, User user)
        {
            if (user.Curriculum.Educations.Count > 0)
            {
                Paragraph subHeader = this.BoldParagraph("Education")
                .SetFontSize(14)
                .SetMarginTop(12)
                .SetMarginBottom(-2);
                doc.Add(subHeader);
                LineSeparator ls = new LineSeparator(new SolidLine());
                doc.Add(ls);

                var paragraphs = new List<Paragraph>();
                user.Curriculum.Educations.ForEach(x =>
                {
                    paragraphs.Add(new Paragraph($"{x.Title}, {x.Institution}").SetMarginTop(8));
                    paragraphs.Add(new Paragraph(x.Period).SetMarginTop(-8).SetFontSize(12));

                });
                foreach (var x in paragraphs)
                {
                    doc.Add(x);
                }
            }
          
        }
        private void AddExperience(ref Document doc, User user)
        {
            if (user.Curriculum.CareerPath.Count > 0)
            {
                Paragraph subHeader = this.BoldParagraph("Career Path")
                .SetFontSize(14)
                .SetMarginTop(12)
                .SetMarginBottom(-2);
                doc.Add(subHeader);
                LineSeparator ls = new LineSeparator(new SolidLine());
                doc.Add(ls);
                Table table = new Table(3).UseAllAvailableWidth();
                user.Curriculum.CareerPath.ForEach(x =>
                {
                    Cell cell1 = new Cell(1, 1)
                        .Add(new Paragraph(x.Role)).SetBorder(Border.NO_BORDER); ;
                    Cell cell2 = new Cell(1, 1)
                        .Add(new Paragraph(x.Company)).SetBorder(Border.NO_BORDER); ;
                    Cell cell3 = new Cell(1, 1)
                       .Add(new Paragraph(x.Period)).SetBorder(Border.NO_BORDER); ;
                    table.AddCell(cell1);
                    table.AddCell(cell2);
                    table.AddCell(cell3);
                });
                doc.Add(table);
            }
        }

        //Skills
        private void AddTechnologies(ref Document doc, User user)
        {
            if (user.Curriculum.Technologies.Count > 0)
            {
                Paragraph subHeader = this.BoldParagraph("Technologies")
                .SetFontSize(14)
                .SetMarginTop(12)
                .SetMarginBottom(-2);
                doc.Add(subHeader);
                LineSeparator ls = new LineSeparator(new SolidLine());
                doc.Add(ls);
                Table table = new Table(2).UseAllAvailableWidth();
                user.Curriculum.Technologies.ForEach(x =>
                {
                    Cell cell1 = new Cell(1, 1)
                        .Add(new Paragraph(x.Description)).SetBorder(Border.NO_BORDER); ;
                    Cell cell2 = new Cell(1, 1)
                        .Add(new Paragraph(x.Level.ToString())).SetBorder(Border.NO_BORDER); ;
                    table.AddCell(cell1);
                    table.AddCell(cell2);
                });
                doc.Add(table);
            }
        }
        private void AddMethodologies(ref Document doc, User user)
        {
            if (user.Curriculum.Methodologies.Count > 0)
            {
                Paragraph subHeader = this.BoldParagraph("Methodologies")
                .SetFontSize(14)
                .SetMarginTop(12)
                .SetMarginBottom(-2);
                doc.Add(subHeader);
                LineSeparator ls = new LineSeparator(new SolidLine());
                doc.Add(ls);
                Table table = new Table(2).UseAllAvailableWidth();
                user.Curriculum.Methodologies.ForEach(x =>
                {
                    Cell cell1 = new Cell(1, 1)
                        .Add(new Paragraph(x.Description)).SetBorder(Border.NO_BORDER); ;
                    Cell cell2 = new Cell(1, 1)
                        .Add(new Paragraph(x.Level.ToString())).SetBorder(Border.NO_BORDER); ;
                    table.AddCell(cell1);
                    table.AddCell(cell2);
                });
                doc.Add(table);
            }
        }
        private void AddTools(ref Document doc, User user)
        {
            if (user.Curriculum.Tools.Count > 0)
            {
                Paragraph subHeader = this.BoldParagraph("Tools")
                .SetFontSize(14)
                .SetMarginTop(12)
                .SetMarginBottom(-2);
                doc.Add(subHeader);
                LineSeparator ls = new LineSeparator(new SolidLine());
                doc.Add(ls);
                Table table = new Table(2).UseAllAvailableWidth();
                user.Curriculum.Tools.ForEach(x =>
                {
                    Cell cell1 = new Cell(1, 1)
                        .Add(new Paragraph(x.Description)).SetBorder(Border.NO_BORDER); ;
                    Cell cell2 = new Cell(1, 1)
                        .Add(new Paragraph(x.Level.ToString())).SetBorder(Border.NO_BORDER); ;
                    table.AddCell(cell1);
                    table.AddCell(cell2);
                });
                doc.Add(table);
            }
        }

        //Proyects

        private void AddProyects(ref Document doc, User user)
        {
            if (user.Curriculum.Projects.Count > 0)
            {
                Paragraph subHeader = this.BoldParagraph("Proyects")
                  .SetFontSize(14)
                  .SetMarginTop(12)
                  .SetMarginBottom(-2);
                doc.Add(subHeader);
                LineSeparator ls = new LineSeparator(new SolidLine());
                doc.Add(ls);
                foreach (var x in user.Curriculum.Projects)
                {
                    var margintop = 12;
                    //numColumns
                    var table = new Table(new float[] { 1, 7 }).SetMarginTop(margintop).UseAllAvailableWidth();

                    if (!String.IsNullOrEmpty(x.ProjectName))
                    {
                        Cell cell = new Cell(1, 2).SetBorder(Border.NO_BORDER).SetBorderBottom(new SolidBorder(Color.ConvertRgbToCmyk(new DeviceRgb(128, 128, 128)), 1));
                        cell.Add(this.BoldParagraph(x.ProjectName).SetFontColor(new DeviceRgb(0, 126, 237)));
                        table.AddCell(cell);
                    }

                    if (!String.IsNullOrEmpty(x.Client))
                    {
                        table.AddCell(new Cell(1, 1)
                            .SetPadding(4)
                          
                            .SetBorder(Border.NO_BORDER)
                            // .SetBorderLeft(new SolidBorder(Color.ConvertRgbToCmyk(new DeviceRgb(128, 128, 128)),1))
                            // .SetBorderTop(new SolidBorder(Color.ConvertRgbToCmyk(new DeviceRgb(128, 128, 128)), 1))
                            //.SetBorderTopLeftRadius(new BorderRadius(8))
                            .Add(this.BoldParagraph("Client")));


                        table.AddCell(new Cell(1, 1)
                            .SetPadding(4)
                            .SetBorder(Border.NO_BORDER)
                            //.SetBorderRight(new SolidBorder(Color.ConvertRgbToCmyk(new DeviceRgb(128, 128, 128)),1))
                            //.SetBorderTop(new SolidBorder(Color.ConvertRgbToCmyk(new DeviceRgb(128, 128, 128)), 1))
                            //.SetBorderTopRightRadius(new BorderRadius(8))
                            .Add(new Paragraph(x.Client)));
                    }

                    if (!String.IsNullOrEmpty(x.Dedication))
                    {
                        table.AddCell(new Cell(1, 1).SetPadding(4).SetBorder(Border.NO_BORDER).Add(this.BoldParagraph("Dedication")));
                        table.AddCell(new Cell(1, 1).SetPadding(4).SetBorder(Border.NO_BORDER).Add(new Paragraph(x.Dedication)));
                    }

                    if (!String.IsNullOrEmpty(x.Description))
                    {
                        table.AddCell(new Cell(1, 1).SetPadding(4).SetBorder(Border.NO_BORDER).Add(this.BoldParagraph("Description")));
                        table.AddCell(new Cell(1, 1).SetPadding(4).SetBorder(Border.NO_BORDER).Add(new Paragraph(x.Description)));
                    }

                    if (!String.IsNullOrEmpty(x.BusinessLine))
                    {
                        table.AddCell(new Cell(1, 1).SetPadding(4).SetBorder(Border.NO_BORDER).Add(this.BoldParagraph("Business line")));
                        table.AddCell(new Cell(1, 1).SetPadding(4).SetBorder(Border.NO_BORDER).Add(new Paragraph(x.BusinessLine)));
                    }

                    if (!String.IsNullOrEmpty(x.Role))
                    {
                        table.AddCell(new Cell(1, 1).SetPadding(4).SetBorder(Border.NO_BORDER).Add(this.BoldParagraph("Role")));
                        table.AddCell(new Cell(1, 1).SetPadding(4).SetBorder(Border.NO_BORDER).Add(new Paragraph(x.Role)));
                    }

                    if (!String.IsNullOrEmpty(x.TechStack))
                    {
                        table.AddCell(new Cell(1, 1).SetPadding(4).SetBorder(Border.NO_BORDER).Add(this.BoldParagraph("Tech stack")));
                        table.AddCell(new Cell(1, 1).SetPadding(4).SetBorder(Border.NO_BORDER).Add(new Paragraph(x.TechStack)));
                    }

                    if (!String.IsNullOrEmpty(x.Location))
                    {
                        table.AddCell(new Cell(1, 1).SetPadding(4).SetBorder(Border.NO_BORDER).Add(this.BoldParagraph("Location")));
                        table.AddCell(new Cell(1, 1).SetPadding(4).SetBorder(Border.NO_BORDER).Add(new Paragraph(x.Location)));
                    }


                    doc.Add(table);
                };
            }
        }
     

        private Paragraph BoldParagraph(string value)
        {
            Text text = new Text(value);
            text.SetFont(PdfFontFactory.CreateFont(StandardFonts.HELVETICA_BOLD));
            return new Paragraph(text);

        }

        private int CalculateYears(DateTime birthdate)
        {
            DateTime zeroTime = new DateTime(1, 1, 1);

            DateTime a = birthdate;
            DateTime b = DateTime.Now;

            TimeSpan span = b - a;

            int years = (zeroTime + span).Year - 1;
            return years;
        }
    }
}

