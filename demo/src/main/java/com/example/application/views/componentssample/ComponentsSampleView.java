package com.example.application.views.componentssample;

import com.example.application.data.entity.SamplePerson;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.checkbox.CheckboxGroup;
import com.vaadin.flow.component.checkbox.CheckboxGroupVariant;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.combobox.MultiSelectComboBox;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.datetimepicker.DateTimePicker;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.GridMultiSelectionModel;
import com.vaadin.flow.component.html.*;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.messages.MessageList;
import com.vaadin.flow.component.messages.MessageListItem;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.component.radiobutton.RadioGroupVariant;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.component.textfield.IntegerField;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteAlias;
import com.vaadin.flow.theme.lumo.LumoIcon;
import com.vaadin.flow.theme.lumo.LumoUtility;
import com.vaadin.flow.theme.lumo.LumoUtility.Margin;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

@PageTitle("Components Sample")
@Route(value = "components-sample")
@RouteAlias(value = "")
public class ComponentsSampleView extends HorizontalLayout {

    private Checkbox persistentNotifications;

    public ComponentsSampleView() {
        setSizeFull();
        setClassName("components-view");
        addClassNames(LumoUtility.Gap.LARGE);
        FlexLayout col1 = new FlexLayout();
        col1.setFlexDirection(FlexLayout.FlexDirection.COLUMN);
        col1.addClassNames(LumoUtility.Gap.LARGE);
        col1.setWidthFull();
        col1.add(createButtonExamples());
        col1.add(createFieldExamples());

        FlexLayout col2 = new FlexLayout();
        col2.setFlexDirection(FlexLayout.FlexDirection.COLUMN);
        col2.addClassNames(LumoUtility.Gap.LARGE);
        col2.setWidthFull();
        col2.add(createGridExample());
        col2.add(createTabsExample());
        col2.add(createNotificationsExample());
        col2.add(createMessagesExample());

        add(col1, col2);
    }

    private Component createButtonExamples() {
        VerticalLayout layout = new VerticalLayout();
        layout.addClassName("card");
        layout.addClassName(LumoUtility.Gap.SMALL);

        layout.add(generateButtonVariants());
        layout.add(generateButtonVariants(ButtonVariant.LUMO_ERROR));
        layout.add(generateButtonVariants(ButtonVariant.LUMO_SUCCESS));
        layout.add(generateButtonVariants(ButtonVariant.LUMO_CONTRAST));

        return layout;
    }

    private HorizontalLayout generateButtonVariants() {
        HorizontalLayout buttons = new HorizontalLayout();
        buttons.addClassName(LumoUtility.FlexWrap.WRAP);

        Button primaryButton = new Button("Primary");
        primaryButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        Button secondaryButton = new Button("Secondary");

        Button tertiaryButton = new Button("Tertiary");
        tertiaryButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY);

        Button primaryIconButton = new Button();
        primaryIconButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        primaryIconButton.setIcon(LumoIcon.SEARCH.create());

        Button secondaryIconButton = new Button();
        secondaryIconButton.setIcon(LumoIcon.SEARCH.create());

        Button tertiaryIconButton = new Button();
        tertiaryIconButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY);
        tertiaryIconButton.setIcon(LumoIcon.SEARCH.create());

        buttons.add(new HorizontalLayout(primaryButton, secondaryButton, tertiaryButton), new HorizontalLayout(primaryIconButton, secondaryIconButton, tertiaryIconButton));
        return buttons;
    }
    private HorizontalLayout generateButtonVariants(ButtonVariant variant) {
        HorizontalLayout buttons = new HorizontalLayout();
        buttons.addClassName(LumoUtility.FlexWrap.WRAP);

        Button primaryButton = new Button("Primary");
        primaryButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        primaryButton.addThemeVariants(variant);

        Button secondaryButton = new Button("Secondary");
        secondaryButton.addThemeVariants(variant);

        Button tertiaryButton = new Button("Tertiary");
        tertiaryButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY);
        tertiaryButton.addThemeVariants(variant);

        Button primaryIconButton = new Button();
        primaryIconButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        primaryIconButton.setIcon(LumoIcon.SEARCH.create());
        primaryIconButton.addThemeVariants(variant);

        Button secondaryIconButton = new Button();
        secondaryIconButton.setIcon(LumoIcon.SEARCH.create());
        secondaryIconButton.addThemeVariants(variant);

        Button tertiaryIconButton = new Button();
        tertiaryIconButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY);
        tertiaryIconButton.setIcon(LumoIcon.SEARCH.create());
        tertiaryIconButton.addThemeVariants(variant);

        buttons.add(new HorizontalLayout(primaryButton, secondaryButton, tertiaryButton), new HorizontalLayout(primaryIconButton, secondaryIconButton, tertiaryIconButton));
        return buttons;
    }

    private Component createFieldExamples() {
        HorizontalLayout layout = new HorizontalLayout();
        layout.addClassName("card");
        layout.addClassName(LumoUtility.Gap.LARGE);

        VerticalLayout left = new VerticalLayout();
        left.setPadding(false);
        left.addClassName(LumoUtility.Gap.SMALL);
        VerticalLayout right = new VerticalLayout();
        right.setPadding(false);
        right.addClassName(LumoUtility.Gap.SMALL);

        TextField basic = new TextField("Field");
        basic.setWidthFull();

        TextField trailingContent = new TextField("Read-only");
        trailingContent.setSuffixComponent(new Div(new Text("EUR €")));
        trailingContent.setValue("500.00");
        trailingContent.setReadOnly(true);
        trailingContent.setWidthFull();

        TextField leadingIcon = new TextField("Invalid");
        leadingIcon.setPlaceholder("Leading icon");
        leadingIcon.setPrefixComponent(LumoIcon.PHONE.create());
        leadingIcon.setValue("12345678");
        leadingIcon.setErrorMessage("Invalid phone number");
        leadingIcon.setInvalid(true);
        leadingIcon.setWidthFull();

        TextField supportiveText = new TextField("Focused");
        supportiveText.setHelperText("Helper text");
        supportiveText.setPlaceholder("Placeholder");
        supportiveText.getElement().setAttribute("focus-ring", "");
        supportiveText.setWidthFull();

        TextField disabledField = new TextField("Disabled");
        disabledField.setValue("Value");
        disabledField.setEnabled(false);
        disabledField.setWidthFull();

        IntegerField integerField = new IntegerField("Number field");
        integerField.setHelperText("Max 10 items");
        integerField.setMin(0);
        integerField.setMax(10);
        integerField.setValue(2);
        integerField.setStepButtonsVisible(true);
        integerField.setWidthFull();

        int charLimit = 140;
        TextArea textArea = new TextArea();
        textArea.setLabel("Comment");
        textArea.setMaxLength(charLimit);
        textArea.setValueChangeMode(ValueChangeMode.EAGER);
        textArea.addValueChangeListener(e -> {
            e.getSource()
                .setHelperText(e.getValue().length() + "/" + charLimit);
        });
        textArea.setValue("You've got some nice components there!");
        textArea.setWidthFull();

        ComboBox<String> comboBox = new ComboBox<>("Combo Box");
        comboBox.setAllowCustomValue(true);
        comboBox.setItems("Item 1", "Item 2", "Item 3", "Item 4");
        comboBox.setPlaceholder("Select an option");
        comboBox.setWidthFull();

        MultiSelectComboBox<String> multiSelectComboBox = new MultiSelectComboBox<>("Multiselect");
        multiSelectComboBox.setWidth("300px");
        multiSelectComboBox.setAllowCustomValue(true);
        multiSelectComboBox.setItems("Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7", "Item 8", "Item 9", "Item 10");
        multiSelectComboBox.setValue("Item 2", "Item 5", "Item 6");
        multiSelectComboBox.setPlaceholder("Select an options");
        multiSelectComboBox.setWidthFull();

        DatePicker datePicker = new DatePicker("Date Picker");
        datePicker.setPlaceholder("MM/DD/YYYY");
        datePicker.setLocale(Locale.US);
        datePicker.setWidthFull();

        DateTimePicker dateTimePicker = new DateTimePicker("Date Time Picker");
        dateTimePicker.setValue(LocalDateTime.now());
        dateTimePicker.setWidthFull();

        RadioButtonGroup<String> radioGroupVertical = new RadioButtonGroup<>();
        radioGroupVertical.addThemeVariants(RadioGroupVariant.LUMO_VERTICAL);
        radioGroupVertical.setLabel("Radio Buttons");
        radioGroupVertical.setItems("Item 1", "Item 2", "Item 3");
        radioGroupVertical.setValue("Item 1");

        CheckboxGroup<String> checkboxGroupVertical = new CheckboxGroup<>();
        checkboxGroupVertical.addThemeVariants(CheckboxGroupVariant.LUMO_VERTICAL);
        checkboxGroupVertical.setLabel("Checkboxes");
        checkboxGroupVertical.setItems("Item 1", "Item 2", "Item 3");
        checkboxGroupVertical.select("Item 1");


        left.add(basic, trailingContent, leadingIcon, supportiveText, disabledField, integerField, textArea);
        right.add(comboBox, multiSelectComboBox, datePicker, dateTimePicker, radioGroupVertical, checkboxGroupVertical);
        layout.add(left, right);
        return layout;
    }

    private Component createGridExample() {
        Div layout = new Div();
        layout.addClassName("card");

        List<SamplePerson> people = getPeople();

        Grid<SamplePerson> grid = new Grid<>(SamplePerson.class, false);
        grid.setSelectionMode(Grid.SelectionMode.MULTI);
        ((GridMultiSelectionModel<?>) grid
            .setSelectionMode(Grid.SelectionMode.MULTI))
            .setSelectionColumnFrozen(true);
        grid.addColumn(SamplePerson::getFirstName).setHeader("First name").setAutoWidth(true).setFrozen(true);
        grid.addColumn(SamplePerson::getLastName).setHeader("Last name").setAutoWidth(true);
        grid.addColumn(SamplePerson::getEmail).setHeader("Email").setAutoWidth(true);
        grid.addColumn(SamplePerson::getOccupation).setHeader("Profession").setAutoWidth(true);
        grid.setItems(people);
        grid.select(people.get(2));
        grid.setHeight("320px");

        layout.add(grid);
        return layout;
    }

    private Component createTabsExample() {
        FlexLayout layout = new FlexLayout();
        layout.addClassName("card");
        layout.setFlexDirection(FlexLayout.FlexDirection.COLUMN);
        layout.addClassNames(LumoUtility.Gap.LARGE);

        Tab tab1 = new Tab("First tab");
        Tab tab2 = new Tab("Second tab");
        Tab tab3 = new Tab("Third tab");
        Tab tab4 = new Tab("Fourth tab");
        tab4.setEnabled(false);

        Tabs tabs = new Tabs(tab1, tab2, tab3, tab4);
        tabs.setSelectedTab(tab1);

        layout.add(tabs, createBadgesExample());
        return layout;
    }

    private Component createBadgesExample() {
        FlexLayout layout = new FlexLayout();
        layout.addClassNames(LumoUtility.Gap.SMALL, LumoUtility.FlexWrap.WRAP);

        FlexLayout normalBadges = new FlexLayout();
        normalBadges.addClassNames(LumoUtility.Gap.SMALL);
        FlexLayout primaryBadges = new FlexLayout();
        primaryBadges.addClassNames(LumoUtility.Gap.SMALL);

        Span none = new Span("Default");
        none.getElement().getThemeList().add("badge");

        Span success = new Span("Success");
        success.getElement().getThemeList().add("badge success");

        Span error = new Span("Error");
        error.getElement().getThemeList().add("badge error");

        Span contrast = new Span("Contrast");
        contrast.getElement().getThemeList().add("badge contrast");

        Span nonePrimary = new Span("Default");
        nonePrimary.getElement().getThemeList().add("badge primary");

        Span successPrimary = new Span("Success");
        successPrimary.getElement().getThemeList().add("badge success primary");

        Span errorPrimary = new Span("Error");
        errorPrimary.getElement().getThemeList().add("badge error primary");

        Span contrastPrimary = new Span("Contrast");
        contrastPrimary.getElement().getThemeList().add("badge contrast primary");


        normalBadges.add(none, success, error, contrast);
        primaryBadges.add(nonePrimary, successPrimary, errorPrimary, contrastPrimary);
        layout.add(normalBadges, primaryBadges);
        return layout;
    }

    // TODO Use MenuBar instead
    private Component createNotificationsExample() {
        FlexLayout layout = new FlexLayout();
        layout.addClassName("card");
        layout.setFlexDirection(FlexLayout.FlexDirection.COLUMN);
        layout.addClassNames(LumoUtility.Gap.LARGE);

        persistentNotifications = new Checkbox("Auto-close");
        persistentNotifications.setValue(true);
        persistentNotifications.addClassName(Margin.Left.AUTO);

        HorizontalLayout notificationsHeader = new HorizontalLayout();
        notificationsHeader.add(new H3("Notifications"), persistentNotifications);

        HorizontalLayout buttons = new HorizontalLayout();
        buttons.addClassNames(LumoUtility.Gap.SMALL, LumoUtility.FlexWrap.WRAP);
        buttons.add(
            createNotificationButton("Default"),
            createNotificationButton("Primary", NotificationVariant.LUMO_PRIMARY, ButtonVariant.LUMO_PRIMARY),
            createNotificationButton("Error", NotificationVariant.LUMO_ERROR, ButtonVariant.LUMO_ERROR),
            createNotificationButton("Success", NotificationVariant.LUMO_SUCCESS, ButtonVariant.LUMO_SUCCESS),
            createNotificationButton("Warning", NotificationVariant.LUMO_WARNING, ButtonVariant.LUMO_ERROR),
            createNotificationButton("Contrast", NotificationVariant.LUMO_CONTRAST, ButtonVariant.LUMO_CONTRAST)
        );

        layout.add(notificationsHeader, buttons);
        return layout;
    }

    private Button createNotificationButton(String buttonLabel, NotificationVariant notificationVariant, ButtonVariant buttonVariant) {
        Button notificationButton = new Button(buttonLabel);
        if (buttonVariant != ButtonVariant.LUMO_PRIMARY) {
            notificationButton.addThemeVariants(buttonVariant);
        }
        notificationButton.addClickListener(e -> {
            Notification notification = Notification.show("This is " + notificationVariant.getVariantName() + " notification");
            notification.addThemeVariants(notificationVariant);
            if (persistentNotifications.getValue() == true) {
                notification.setDuration(5000);
            } else {
                Button closeButton = new Button(new Icon("lumo", "cross"));
                closeButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY_INLINE);
                closeButton.getElement().setAttribute("aria-label", "Close");
                closeButton.addClickListener(event -> {
                    notification.close();
                });
                notification.add(new Text("This is " + notificationVariant.getVariantName() + " notification"), closeButton);
                notification.setDuration(0);
            }
        });

        return notificationButton;
    }

    private Button createNotificationButton(String buttonLabel) {
        Button notificationButton = new Button(buttonLabel);
        notificationButton.addClickListener(e -> {
            Notification notification = Notification.show("This is default notification");
            if (persistentNotifications.getValue() == true) {
                notification.setDuration(5000);
            } else {
                Button closeButton = new Button(new Icon("lumo", "cross"));
                closeButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY_INLINE);
                closeButton.getElement().setAttribute("aria-label", "Close");
                closeButton.addClickListener(event -> {
                    notification.close();
                });
                notification.add(new Text("This is default notification"), closeButton);
                notification.setDuration(0);
            }
        });

        return notificationButton;
    }

    private Component createMessagesExample() {
        Div layout = new Div();
        layout.addClassName("card");

        List<SamplePerson> people = getPeople();
        MessageList list = new MessageList();
        Instant yesterday = LocalDateTime.now().minusDays(1)
            .toInstant(ZoneOffset.UTC);
        Instant fiftyMinsAgo = LocalDateTime.now().minusMinutes(50)
            .toInstant(ZoneOffset.UTC);
        MessageListItem message1 = new MessageListItem(
            "Linsey, did you know these apps can be fully styled?",
            yesterday, "Matt Mambo");
        message1.setUserColorIndex(1);
        MessageListItem message2 = new MessageListItem("Yup. Lumo is always there as the base and modifications can be applied on top.",
            fiftyMinsAgo, "Linsey Listy");
        message2.setUserColorIndex(2);
        MessageListItem message3 = new MessageListItem(
            "Cool!",
            yesterday, "Matt Mambo");
        message3.setUserColorIndex(1);
        list.setItems(Arrays.asList(message1, message2, message3));

        layout.add(list);
        return layout;
    }

    public List<SamplePerson> getPeople(){
        ArrayList<SamplePerson> people = new ArrayList<>();

        for (int i = 0; i < 20; i++) {
            SamplePerson person = new SamplePerson();
            person.setFirstName("Firstname" + i);
            person.setLastName("Lastname" + i);
            person.setEmail("firstname" + i +"@company.com");
            person.setOccupation("Developer");

            people.add(person);
        }
        return people;
    }

}
